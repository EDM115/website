---
title: How I migrated to Zod 4 - EDM115 blog
meta:
  - name: description
    content: How I migrated the company monorepo to Zod v4 during my internship
  - name: summary
    content: This article details my experience migrating a company monorepo to Zod v4 during my internship. It covers the challenges faced, the solutions implemented, and practical tips for developers looking to upgrade their Zod usage.
---

# How I migrated the company monorepo to Zod v4 during my internship
We all know Zod, an awesome library to validate data by type-checking, pattern-matching and more.  
And recently the long-awaited version 4 has been released, and as the repo I worked on during my internship used it, I thought I'll take care to do this migration before the end of my internship, and learn Zod in the process !  
You know, I believe that the companies I work at could easily call me **the migrator**, as during my 2 internships, my first task was to migrate all dependencies to their latest versions (often migrating whole frameworks and dealing with lots of deprecations).  
I don't mind doing this, and as I'm very methodic with the upgrades (always checking the release notes/changelogs/diffs if there's nothing) and I thoughtfully test changes, so everything goes buttery smooth. I also leave notes and easy tips for migration in the other dev's branches.  
Anyway, the monorepo I'm talking about uses Zod in 2 main ways :
- types definition
- schema validation
For the first one, they simply define types in a shared `types` package, and these types can later be reused in the backends, frontend and more. For example :
```typescript
const deviceDetails = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  lastMessage: z.date().nullable().optional(),
  siteId: z.number(),
  enable: z.boolean(),
  serialNumber: z.string().nullable().optional(),
  deviceType: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  deviceStatus: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  health: z
    .object({
      network: z.string().optional(),
      status: z.string().optional(),
      config: z.string().optional(),
    })
    .optional(),
})

export type DeviceDetailsType = z.infer<typeof deviceDetails>
```
This way, we have a programmatic way to define a type, and we have a handy Zod object that goes along with it.  
The second way basically references the Zod object (`deviceDetails`) as a way to validate an API route (either input or output) with `fastify-zod`.

## Part 0 : The upgrades
The release of Zod v4 came weeks after I already did a massive pass of upgrades so I didn't had much else to look out for (and I regularly kept dependencies up to date each week).  
Upon reading the release notes and migration guide, I instantly saw that Zod now supports generating [JSON Schemas](https://zod.dev/json-schema) ! This is a great news, because it allows us to drop the unmaintained [`fastify-zod`](https://github.com/elierotenberg/fastify-zod) library (and we would finally drop the override on `fastify` :sweat_smile:).  
Here's how API validation worked before :
1. Define your schema
  ```typescript
  // packages/types/src/thing.ts
  import { z } from "zod"

  const somethingSchema = z.object({
    value: z.string(),
    other_value: z.string().optional(),
  })

  export const thingSchemas = {
    // ...
    somethingSchema,
  }
  ```
2. Grab your schemas for your individual route
  ```typescript
  // services/backend/src/modules/thing/thing.schema.ts
  import { buildJsonSchemas } from "fastify-zod"

  import { thingSchemas } from "@company/types/thing"

  export const { schemas: refThingSchemas, $ref } = buildJsonSchemas(
    {
      ...thingSchemas,
    },
    { $id: "thingSchemas" },
  )
  ```
3. Register your schemas for the server
  ```typescript
  // services/backend/src/server.ts
  import { refThingSchemas } from "./modules/thing/thing.schema"

  // Init Fastify and all...
  for (const schema of [
    // ...
    refThingSchemas,
  ]) {
    fastify.addSchema(schema)
  }
  ```
4. Use in your route
  ```typescript
  // services/backend/src/modules/thing/thing.route.ts
  import { $ref as refThingSchemas } from "./thing.schema"

  const thingRoutes: FastifyPluginCallback<{ prefix: string }> = (
    fastify,
    _options,
    done,
  ) => {
    fastify.get("/", {
      schema: {
        response: {
          200: refThingSchemas("somethingSchema"),
        },
      },
      handler: getThingHandler,
    })
  }
  ```
It works, but we can do better.

## Part 1 : A new package
Well, not exactly.  
To use Zod v4, all you have to do is to use the latest version, and change your imports :
```diff
- import { z } from "zod"
+ import { z } from "zod/v4"
```
This will yield all deprecation warnings and errors so fix them first \:)  
> [!NOTE]  
> Although it is in a subpath, it isn't possible to keep 2 versions of Zod on the same codebase.
  
Now that we're done with this, it's time to use the new JSON Schema converter !

## Part 2 : Building the schemas
Surprisingly, the amount of code to change for it to work isn't that big.  
But first off, we have to talk about another new feature of Zod v4 : [Metadata and registries](https://zod.dev/metadata).  
When Fastify wants to validate a schema, it needs a way to identify it. It is done through the `$id` property in the schema itself. To add this information, adding metadata seems the best way to go about it.  
Here's how you do it :
```typescript
// packages/types/src/thing.ts
import { z } from "zod"

const somethingSchema = z.object({
  value: z.string(),
  other_value: z.string().optional(),
}).meta({ $id: "something" }) // I preferred to drop the "schema" part of the name to remove redundancy in the code

export thingSchemas = [
  // ...
  somethingSchema,
] // Note how we switch from an object to an array, this will allow for easier parsing down the line, but if you needed to access thingSchemas.somethingSchema, just export somethingSchema directly from now on
```
Easy, *right* ?  
Well, **no**.  
The `.meta()` method is a shorthand for `.register(z.globalRegistry, { ... })`, which means that the metadata you pass in is registered *globally*, and as such, must be **unique**.  
You cannot have 2 schemas with the same `$id`, even if they're in different files and used in different backends.
> [!TIP]  
> To circumvent this, a better approach is to create a registry per service, or even per route !  
> You can do it like this, I just didn't bothered :
> ```typescript
> const backendRegistry = z.registry<{ $id: string }>()
> 
> backendRegistry.add(somethingSchema, { $id: "something" })
> ```
  
> [!CAUTION]  
> Also, here's a fun thing (is it a bug ?) : **A schema with metadata can't contain another schema with metadata**.  
> Or, Zod won't complain, but Fastify will when registering them, as it will deeply check the schemas, and will try to register the inner schema after it already has been declared.  
> The only way I found to fix it is to create a variant with no metadata :
> ```typescript
> const somethingSchemaNoMeta = z.object({
>   value: z.string(),
>   other_value: z.string().optional(),
> })
> const somethingSchema = somethingSchemaNoMeta.meta({ $id: "something" })
> 
> const nestedSchema = z.object({
>   id: z.number(),
>   something: somethingSchemaNoMeta,
> })
> ```
  
Once your schemas are ready to be used, you have to, well, use them.

## Part 3 : Using the schemas
Remember when we had to use `fastify-zod` ?  
Well no more, here's how simple it gets (I recommend to create a helper function like I did) :
```typescript
// packages/types/src/schemaHelper.ts
import { toJSONSchema, type ZodType } from "zod/v4"

export function zodSchemasToJSONSchema(schemas: ZodType[]) {
  const jsonSchemas = schemas.map((schema) => {
    return toJSONSchema(schema, {
      target: "draft-7", // Fastify acccepts this format only, and it isn't the default for Zod
      unrepresentable: "any", // Accepts some types impossible to represent, check the docs for more info
    })
  })

  return jsonSchemas
}
```
```typescript
// services/backend/src/modules/thing/thing.schema.ts
import { zodSchemasToJSONSchema } from "@company/types/schemaHelper"

import { thingSchemas } from "@company/types/thing"

export const refThingSchemas = zodSchemasToJSONSchema(thingSchemas)
```
```typescript
// services/backend/src/server.ts
import { refThingSchemas } from "./modules/thing/thing.schema"

// Init Fastify and all...
const schemasList = [
  // ...
  ...Object.values(refThingSchemas),
]

for (const schema of schemasList) {
  fastify.addSchema(schema)
}
```
```typescript
// services/backend/src/modules/thing/thing.route.ts
const thingRoutes: FastifyPluginCallback<{ prefix: string }> = (
  fastify,
  _options,
  done,
) => {
  fastify.get("/", {
    schema: {
      response: {
        200: { $ref: "something" }, // no more imports !
      },
    },
    handler: getThingHandler,
  })
}
```

## Part 4 : Final thoughts
As I was doing this migration, several things happened in Zod issues (when you have a package that's this much used, obviously [changes will cause issues somewhere](https://xkcd.com/1172/)), so here's stuff I had to deal with :
- For some time, the `$schema` identifier was wrong, so I had to work around it :
  ```typescript
  for (const schema of schemasList) {
    fastify.addSchema({
      ...schema,
      // hack until https://github.com/colinhacks/zod/issues/4412 is fixed
      $schema: "http://json-schema.org/draft-07/schema#",
    })
  }
  ```
- A change to how additional properties are handled caused an issue in one of the services of the monorepo, as Zod was used there merely to check some "required" properties in order to sort the processing depending on which "provider" sent us the data, but obviously there's a ton of extra props that might be sent as well in the object, and they change regularly.  
  Here's how to fix it :
  ```typescript
  import { core, toJSONSchema, type ZodType } from "zod/v4"
  
  export function zodSchemasToJSONSchema(schemas: ZodType[]) {
    const jsonSchemas = schemas.map((schema) => {
      return toJSONSchema(schema, {
        // Allow to accept additional properties in objects
        override(ctx) {
          const def = (ctx.zodSchema as core.$ZodTypes)._zod.def
          if (def.type === "object" && !def.catchall) {
            ;(
              ctx.jsonSchema as core.JSONSchema.ObjectSchema
            ).additionalProperties = true
          }
        },
        // another way is to set io: "input", tho I'm unsure about this
        target: "draft-7",
        unrepresentable: "any",
      })
    })
    
    return jsonSchemas
  }
  ```
- I encountered an interesting issue with Fastify : apparently it can't get right tuples with "limits". Here's an example :
  ```typescript
  const baseObject = z.object({
    surface: z
      .object({ value: z.number(), unitSource: z.string() })
      .nullable()
      .optional(),
    timezone: z.string().nullable().optional(),
    presenceHours: z
      .object({
        timezone: z.string(),
        hours: z.record(
          z.enum(["0", "1", "2", "3", "4", "5", "6"]),
          z
            .array(
              z.object({
                start: z.tuple([
                  z.number().min(0).max(23),
                  z.number().min(0).max(59),
                ]),
                stop: z.tuple([
                  z.number().min(0).max(23),
                  z.number().min(0).max(59),
                ]),
              })
            )
            .min(1)
        ),
      })
      .optional(),
    reducedHours: z.array(z.tuple([z.string(), z.string()])).optional(),
  })
  
  const extendedObject = baseObject
    .extend({
      siteId: z.string(),
      organizationId: z.string(),
    })
    .meta({ $id: "extendedObject" })
  ```
  This will yield the following error if your Fastify server is in strict TypeScript mode :
  ```logs
  strict mode: "items" is 2-tuple, but minItems or maxItems/additionalItems are not specified or different at path "extendedObject/properties/presenceHours/properties/hours/additionalProperties/items/properties/start"
  strict mode: "items" is 2-tuple, but minItems or maxItems/additionalItems are not specified or different at path "extendedObject/properties/presenceHours/properties/hours/additionalProperties/items/properties/stop"
  strict mode: "items" is 2-tuple, but minItems or maxItems/additionalItems are not specified or different at path "extendedObject/properties/reducedHours/items"
  ```
  If this happens to you, add this in your Schema generator function before the return :
  ```typescript
  // oxlint-disable-next-line no-explicit-any (or eslint)
  function enforceTuples(obj: any) {
    if (obj && typeof obj === "object") {
      if ("items" in obj && Array.isArray(obj.items)) {
        const len = obj.items.length
        obj.minItems = len
        obj.maxItems = len
      }

      for (const key of Object.keys(obj)) {
        enforceTuples(obj[key])
      }
    }
  }

  for (const schema of jsonSchemas) {
    enforceTuples(schema)
  }
  ```
- This is not related to Zod but for posterity I wanted to mention it : Fastify will drop any schema in `oneOf` and `allOf` validations when they are too similar.  
  You can find more info about it here : https://github.com/fastify/fastify/issues/6133
- Migrating to Zod v4 for JSON Schema creation and validation wasn't hard and actually eases a lot of things !

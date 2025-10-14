---
title: How to send DTMF on Android - EDM115 blog
meta:
  - name: description
    content: How to (actually) send DTMF on Android without being the default call app
  - name: summary
    content: This post shows how I implemented a reliable workaround to send DTMF during active cellular calls, using an AccessibilityService to detect the in-call UI, open the dialpad and simulate digit taps. I explain failed approaches, key pitfalls, and a robust final implementation so you can reproduce it in Kotlin (or Java), handy for assistive-tech projects that need remote control of phone calls.
---

# How to (actually) send DTMF on Android without being the default call app

### What ?
Today, I will share my solution to a problem I recently encountered : **sending DTMF inputs during a call**.  
Despite it seeming trivial, there's actually **no** built-in solution for my use case, and I had to write something from scratch to make it work.  
But, what *is* the use case ?

## A bit of context, sir
Recently, I worked on [LifeCompanion](https://github.com/lifecompanionaac/lifecompanion), an open-source, free, and highly customizable digital assistant. It supports individuals with motor, sensory, or cognitive disabilities by offering features like speech synthesis, virtual keyboards, pictographic communication, and compatibility with assistive devices. Developed since 2015, it promotes autonomy and social participation.  
With some colleagues at my school, we were tasked to add a plugin to handle communication with an Android phone (send and read SMS, and take calls). This is a great force of LifeCompanion : being able to extend itself through plugins.  
> To clarify, 2 teams of students made the original plugins a year prior (messages and calls parts), and we were tasked to merge them into a singular plugin.  
> Still, many features were missing, and DTMF was one of them.  
> Also, the code of the Android app is written in Kotlin but the implementation can be transferred to Java code.

## But what is DTMF ?
[DTMF](https://en.wikipedia.org/wiki/DTMF), aka *Dual-tone multi-frequency signaling* is a system that uses specific frequencies to convey a character. I won't go over the Wikipedia page (y'all can read), but all you should know is that this system is still in use **to this day** when composing on the Keypad during a call (ex : when you're prompted to enter your client number or to re listen your voice message).  
And while this is an essential part of calling apps, the team that worked on the call part of the plugin didn't implement it. So naturally, I decided to [do it](https://github.com/EDM115-org/lifecompanion/issues/22). What could possibly go wrong ?

## Turns out, there's no API for it
Or, is it ?  
Well, the class `android.telecom.Call` have a method [`playDtmfTone()`](https://developer.android.com/reference/kotlin/android/telecom/Call#playdtmftone) (and obviously `stopDtmfTone()`). But to use these functions, you need to have access to the current Call object, and to do so you need to [**be the default phone app**](https://developer.android.com/reference/kotlin/android/telecom/InCallService#becoming-the-default-phone-app). Although feasible, it would require to implement all features that users require from a regular call app (dialer, contacts list, call history, voicemail, ...), and honestly we didn't had the time nor the motivation (and imagine all the edge cases to handle !).  
Obviously, I didn't catched that so I started to write code that would *not* work...  
> At this moment, it would be great for you to understand quickly how the app we created works.  
> Basically, the phone is connected with the PC through a cable, and we communicate via ADB.  
> When we need to request or send data to the phone, we start an intent with extra data, which is a Base64-ed JSON with fields explaining what we want to get/send.  
> The app then proceeds to pass the data to the relevant controller, which will do its magic, and if needed, output JSON to a specific folder on the phone that LifeCompanion will poll regularly to know if the response is ready to obtain.  
> So for example, if we want to send the DTMF "`8`", we will send from the pc `adb shell am start-foreground-service -a org.lifecompanion.phonecontrolapp.services.JSONProcessingService --es extra_data eyJzZW5kZXIiOiAicGMiLCJ0eXBlIjogImNhbGwiLCJzdWJ0eXBlIjoibnVtcGFkX2lucHV0IiwiZGF0YSI6eyJkdG1mIjogIjgifX0=`, the extra data symbolizing this :  
> ```json
> {
>   "sender": "pc",
>   "type": "call",
>   "subtype": "numpad_input",
>   "data": {
>     "dtmf": "8"
>   }
> }
> ```  
> The app will then process this, and pass the data to the `services.CallController`, which will call the right function. Also at this point we don't care if the DTMF has been sent correctly, so there's no `request_id` in the JSON, we don't check if it has worked or not.  
> Finally, file paths for Kotlin files are relative to `src/main/java/org/lifecompanion/phonecontrolapp` unless specified otherwise (ressource files for example).

So, in the following code examples I will only focus on the DTMF-related pieces, leaving the rest of the Call and JSON processing logic aside. You can find more about the app itself [on the repo](https://github.com/EDM115-org/lifecompanion/tree/main/lifecompanion-plugins/lc-phonecontrol-plugin/android/).

## Oh, the misery
```kotlin
// services/CallService.kt
package org.lifecompanion.phonecontrolapp.services

import android.telecom.Call
import org.lifecompanion.phonecontrolapp.services.CallStateListener
// ...

class CallService : Service(), CallStateListener {
    private var currentCall: Call? = null
    // ...

    override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {
        // ...
        CallWatcher.callStateListener = this
    }

    override fun onCallStateChanged(call: Call?, isIncoming: Boolean, isActive: Boolean, phoneNumber: String?) {
        currentCall = call
        // ...
    }

    private fun sendDtmf(dtmf: String) {
        if (currentCall == null) {
            return
        }

        try {
            currentCall?.playDtmfTone(dtmf)
            // Pause between tones to ensure proper transmission
            Thread.sleep(300)
            currentCall?.stopDtmfTone()
        } catch (e: Exception) {
            // womp womp
        }
    }

    // ...
```
```kotlin
// services/CallStateListener.kt
package org.lifecompanion.phonecontrolapp.services
import android.telecom.Call

interface CallStateListener {
    fun onCallStateChanged(
        call: Call?,
        isIncoming: Boolean,
        isActive: Boolean,
        phoneNumber: String?
    )
}
```
```kotlin
// services/CallWatcher.kt
package org.lifecompanion.phonecontrolapp.services

import android.telecom.Call
import android.telecom.InCallService
import org.lifecompanion.phonecontrolapp.services.CallStateListener

class CallWatcher : InCallService() {
    companion object {
        private const val TAG = "CallWatcher"
        var callStateListener: CallStateListener? = null
    }

    override fun onCallAdded(call: Call) {
        super.onCallAdded(call)
        call.registerCallback(callStateCallback)
        notifyStateChange(call)
    }

    override fun onCallRemoved(call: Call) {
        super.onCallRemoved(call)
        call.unregisterCallback(callStateCallback)
        notifyStateChange(null)
    }

    private val callStateCallback = object : Call.Callback() {
        override fun onStateChanged(call: Call, state: Int) {
            super.onStateChanged(call, state)
            notifyStateChange(call)
        }
    }

    private fun getPhoneNumber(call: Call?): String? {
        return call?.details?.handle?.schemeSpecificPart
    }

    private fun notifyStateChange(call: Call?) {
        val isIncoming = call?.details?.state == Call.STATE_RINGING
        val isActive = call?.details?.state == Call.STATE_ACTIVE
        val phoneNumber = getPhoneNumber(call)
        callStateListener?.onCallStateChanged(call, isIncoming, isActive, phoneNumber)
    }
}
```

While this code *should* work (probably not), as you can see we extend `InCallService()`, and that would require us to be the default phone app.

## Everybody wants to be my enemy
So because it didn't worked, I decided to do everyone's favorite activity : searching for documentation :)  
What I found is crazy : devs [asked for this feature](https://issuetracker.google.com/issues/36906273) all the way back in 2008 ! It was marked as *Won't Fix (Obsolete)* in 2014, and even the [patches](https://android-review.googlesource.com/c/platform/frameworks/base/+/32820) submitted by some devs were rejected in 2021.  
From what I was able to [read](https://groups.google.com/g/discuss-webrtc/c/9W-gsv4pARU), it apparently is possible for an app to send DTMF tones but [only over VoIP](https://stackoverflow.com/a/10748408/18644204). But guess what ? It is [deprecated](https://developer.android.com/reference/kotlin/android/net/sip/SipAudioCall#senddtmf) by now !  
  
So, time for more searches ! And I browsed everyone's second favorite website : StackOverflow (I come from a time where LLMs weren't the meta).  
And across all the related questions, I haven't found any single answer :(
- [This one](https://stackoverflow.com/questions/8870488/android-dtmf-send-tone-overriding/12986066) suggests that we can send it at call time, but not *during* a call (and also [that one](https://stackoverflow.com/questions/2542014/how-do-i-send-dtmf-tones-and-pauses-using-android-action-call-intent-with-commas)).
- [This one](https://stackoverflow.com/questions/10513233/working-with-dtmf-tones-in-android) was about another technology ([that one](https://stackoverflow.com/questions/10754335/send-dtmf-tones-in-ongoing-call) is the same question but with other answers that confirms what I said previously).
- [This one](https://stackoverflow.com/questions/5343756/problem-with-sending-dtmf-tones-from-android-app-over-an-active-call) tells us that we can "fake" it by playing the frequency ourselves (but that work only when the speakerphone is enabled).
- [This](https://stackoverflow.com/questions/34763971/how-to-send-dtmf-tone-programmatically-during-a-live-call-in-android) is the post that confirmed the `playDtmfTone()` method.
- And finally [this one](https://stackoverflow.com/questions/6342236/sending-dtmf-tones-over-the-uplink-in-call) is a very interesting approach to the problem, although not working.
  
Okay, so I guess it's time for more broad searches, right ?  
- A [random library](https://docs.pjsip.org/en/2.14/specific-guides/sip/dtmf.html) that I found but for a completely separate project.
- An [API](https://github.com/rajeshincorp/UD_SendDtmfToneOverActiveCall) that someone tried to create but that doesn't work sadly.
- I **know** that we would need to [be the default phone app](https://www.b4x.com/android/forum/threads/send-dtmf-on-active-cellular-phone-call-fixed.76637/) !
- A lot of [tutorials](https://4x5mg.net/2019/11/17/sending-dtmf-with-your-smartphone/) have suggested to use a separate app to emit the according frequencies (or for us, to embed them in the app).
  
Hmm... What does AIs have to say about this ?  
Well all of them had either the brilliant idea to suggest `android.telecom.Call.startDtmfTone()` but **without** telling me that we need to be the default phone app, or they would straight up hallucinate methods. Even o1 had trouble helping me in this task or provide alternate ways to handle it.

## The revelation
At this point I was convinced that it wasn't feasible. *If* it wasn't for [Andriy Antonov's solution](https://stackoverflow.com/a/65868662/18644204) !  
This guy had a brilliant idea : Android phones have accessibility services, which allows to emulate clicks on the screen. Why not using them to click on the keypad buttons directly !  
However, his solution had some flaws, notably the fact that we needed the screen coordinates of the buttons, and our app needed to work on all kind of Android devices (including tablets), which made this impossible. But hey, that's nothing that code couldn't solve... :)

> [!NOTE]  
> **Update :** After the publication of this blog post, Andriy shared more details about the backstory of his implementation in a [LinkedIn post](https://www.linkedin.com/posts/andriiantonov_edm115-french-devstudentgamermusic-producer-activity-7288106936519049216-7V5w/?utm_source=edm115.dev).

## Time to lock in
Here's the very first implementation that I made :
```kotlin
// services/DTMFAccessibilityService.kt
package org.lifecompanion.phonecontrolapp.services

import android.accessibilityservice.AccessibilityService
import android.util.Log
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo

class DTMFAccessibilityService : AccessibilityService() {
    companion object {
        private const val TAG = "DTMFAccessibilityService"
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event == null || event.source == null) return

        Log.i(TAG, "Accessibility event received: ${event.eventType}")
        val rootNode = rootInActiveWindow ?: return

        if (isInCallScreen(rootNode)) {
            Log.i(TAG, "In call screen detected")

            if (!isKeypadOpen(rootNode)) {
                openKeypad(rootNode)
            }
        }
    }

    private fun isInCallScreen(node: AccessibilityNodeInfo): Boolean {
        // Check for specific elements that indicate the call screen
        return node.packageName?.contains("dialer", ignoreCase = true) == true
    }

    private fun isKeypadOpen(node: AccessibilityNodeInfo): Boolean {
        // Check for the presence of specific keypad elements that are unique to the keypad
        val keypadElements = listOf("1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "*", "#")

        return keypadElements.any { element ->
            node.findAccessibilityNodeInfosByText(element).isNotEmpty()
        }
    }

    private fun openKeypad(node: AccessibilityNodeInfo) {
        // Find and click the button to open the keypad
        val keypadButtonTexts = listOf("Keypad", "Clavier")

        for (text in keypadButtonTexts) {
            val keypadButton = node.findAccessibilityNodeInfosByText(text).firstOrNull()

            if (keypadButton != null) {
                keypadButton.performAction(AccessibilityNodeInfo.ACTION_CLICK)
                Log.i(TAG, "Keypad opened with text: $text")

                return
            }
        }

        Log.i(TAG, "Keypad button not found")
    }

    fun pressKeypadButton(buttonText: String) {
        val rootNode = rootInActiveWindow ?: return

        if (isInCallScreen(rootNode)) {
            if (!isKeypadOpen(rootNode)) {
                openKeypad(rootNode)
            }

            searchAndClick(rootNode, buttonText)
        }
    }

    private fun searchAndClick(node: AccessibilityNodeInfo, buttonText: String) {
        if (node.text?.toString() == buttonText && node.isClickable) {
            node.performAction(AccessibilityNodeInfo.ACTION_CLICK)
            Log.i(TAG, "Clicked button: $buttonText")

            return
        }

        for (i in 0 until node.childCount) {
            node.getChild(i)?.let { searchAndClick(it, buttonText) }
        }
    }

    override fun onInterrupt() {
        Log.i(TAG, "Accessibility Service Interrupted")
    }
}
```
```kotlin
// services/CallService.kt
package org.lifecompanion.phonecontrolapp.services

import android.content.Intent
// ...

class CallService : Service() {
    // ...

    private fun sendDtmf(dtmf: String) {
        val intent = Intent(this, DTMFAccessibilityService::class.java)
        startService(intent)

        val dtmfService = DTMFAccessibilityService()
        dtmfService.pressKeypadButton(dtmf)
    }
}
```
Obviously we need to ask for accessibility service privilege :
```kotlin
// MainActivity.kt
package org.lifecompanion.phonecontrolapp

import android.app.Activity
import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import org.lifecompanion.phonecontrolapp.services.DTMFAccessibilityService
// ...

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // ...

        promptEnableAccessibilityService()
    }

    // ...

    private fun isAccessibilityServiceEnabled(service: Class<*>): Boolean {
        val enabledServices = Settings.Secure.getString(
            contentResolver,
            Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES
        ) ?: return false
        val colonSplitter = enabledServices.split(":")
        val serviceName = componentName.flattenToString().replace(packageName, service.name)

        return colonSplitter.any { it.equals(serviceName, ignoreCase = true) }
    }

    private fun promptEnableAccessibilityService() {
        if (!isAccessibilityServiceEnabled(DTMFAccessibilityService::class.java)) {
            AlertDialog.Builder(this)
                .setTitle("Enable Accessibility service")
                .setMessage("This app requires the Accessibility service to emulate keyboard inputs during calls. Please enable it in the Accessibility settings. You may need to do this on every restart.")
                .setPositiveButton("Open settings") { _, _ ->
                    val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
                    startActivity(intent)
                }
                .setNegativeButton("Already done", null)
                .show()
        }
    }
}
```
And finally, to declare the accessibility service itself :
```xml
<!-- src/main/res/values/strings.xml -->
<resources>
    <!-- ... -->
    <string name="accessibility_service_description">Accessibility service for the LifeCompanion app</string>
</resources>
```
```xml
<!-- src/main/res/xml/accessibility_service_config.xml -->
<?xml version="1.0" encoding="utf-8"?>
<accessibility-service
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:description="@string/accessibility_service_description"
    android:accessibilityEventTypes="typeWindowContentChanged|typeViewClicked"
    android:accessibilityFeedbackType="feedbackGeneric"
    android:notificationTimeout="100"
    android:canRetrieveWindowContent="true"
    android:accessibilityFlags="flagReportViewIds" />
```
So, what the hell are we actually doing here ?  
1. We declare an accessibility service that is triggered everytime the content of a window changes or when a view is clicked, and ask to get the view IDs.
2. On the `CallService`, we create the `DTMFAccessibilityService` and call its function.
3. On the Accessibility service, whenever we receive an event we check if it's from the active window. If it is, we check if we're in the call screen and then open the keypad if it isn't.
4. `isInCallScreen()` is very primitive and only checks the presence of `dialer` in the window's package name.
5. `isKeypadOpen()` checks if any of the keypad elements (`0-9`, `*` and `#`) is present on the node (which represents the active window in a tree). At first it returned `true` only if **all** of them were present but it didn't worked so I used `any` instead.
6. `openKeypad()` searches for a button in the node that contains in its text "Keypad" or its french version, "Clavier" (the app was made mainly for french users so I had to include it), and clicks on it.
7. The public `pressKeypadButton()` does all of the above and calls `searchAndClick()` which clicks on any node that matches exactly the input string and is clickable.
  
Obviously, it goes without saying that this is *not* optimal, and far from working :
- Due to the incessant calls to `openKeypad()` on the accessibility events, and the barely working check functions, the keypad was constantly opening and closing (which was funny to stare at).
- The logic to check if we're in a call screen and if the keypad is open are very barebones and not flexible.
- The call screen possesses the phone number of the callee, which obviously will always match our `any` clause.
- Overall it wasn't even able to click on the keypad buttons...
  
So, it is time for fixes.

## Make it workey pretty please :pray:
The first edit I did was to comment the code in `onAccessibilityEvent()` to avoid the keypad from flickering in my screen.  
Then, I edited the logic in the `isKeypadOpen()` method :  
```kotlin
private fun isKeypadOpen(node: AccessibilityNodeInfo): Boolean {
    // Count the number of keypad elements on the screen
    val initialCount = countKeypadElements(node)
    // Trigger openKeypad and count again
    openKeypad(node)
    val afterOpenCount = countKeypadElements(node)
    // Determine if the keypad is open based on the counts
    val isOpen = afterOpenCount > initialCount
    // Revert the state by triggering openKeypad again
    openKeypad(node)

    return isOpen
}

private fun countKeypadElements(node: AccessibilityNodeInfo): Int {
    val keypadElements = listOf("1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "*", "#")
    return keypadElements.sumBy { element ->
        node.findAccessibilityNodeInfosByText(element).size
    }
}
```
The logic is simple : we count the number of each element that should be present on the keypad. Then, we click on its button and count again.  
If there's more elements, it means it is open. If not, we closed it, so we click on it again.  
I thought I was clever writing this, but honestly it was still bad : because we call this function anyway at each `pressKeypadButton()` call, we would close and reopen the keypad at every click.  
Or we open only once per phone call, but if the user closed the keypad by accident, then we couldn't reopen it and any button presses would fail.  
So it is time for...

## The final solution
After detailing the goddamn implementation I did and our motive, o1 came in clutch and was finally able to help in this task. Here's the code changes that we did based off some of its recommendations :  
```xml
<!-- src/main/res/xml/accessibility_service_config.xml -->
<?xml version="1.0" encoding="utf-8"?>
<accessibility-service
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:description="@string/accessibility_service_description"
    android:accessibilityEventTypes="typeWindowContentChanged|typeViewClicked|typeWindowStateChanged"
    android:accessibilityFlags="flagReportViewIds|flagIncludeNotImportantViews"
    android:accessibilityFeedbackType="feedbackGeneric"
    android:notificationTimeout="100"
    android:canRetrieveWindowContent="true" />
```
```kotlin
// services/DTMFAccessibilityService.kt
package org.lifecompanion.phonecontrolapp.services

import android.accessibilityservice.AccessibilityService
import android.content.Context
import android.content.Intent
import android.content.pm.ResolveInfo
import android.util.Log
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo

object DTMFAccessibilityServiceSingleton {
    var instance: DTMFAccessibilityService? = null
}

class DTMFAccessibilityService : AccessibilityService() {
    companion object {
        private const val TAG = "LC-DTMFAccessibilityService"

        // Known dialer package names, more may be needed depending of the default call app
        private val KNOWN_DIALER_PACKAGES: List<String> by lazy {
            getPackagesOfDialerApps().apply {
                val additionalPackages = listOf(
                    "com.google.android.dialer",
                    "com.android.dialer",
                    "com.samsung.android.incallui"
                )
                additionalPackages.forEach { pkg ->
                    if (!this.contains(pkg)) {
                        this.add(pkg)
                    }
                }
            }
        }

        // Common text or contentDescriptions for opening the dialpad
        private val DIALPAD_TOGGLE_KEYWORDS = listOf("Keypad", "Clavier", "Dial pad", "Show dial pad")

        private fun getPackagesOfDialerApps(): MutableList<String> {
            val packageNames = mutableListOf<String>()
            val context = DTMFAccessibilityServiceSingleton.instance?.applicationContext

            if (context != null) {
                val intent = Intent(Intent.ACTION_DIAL)
                val resolveInfos: List<ResolveInfo> = context.packageManager.queryIntentActivities(intent, 0)

                for (resolveInfo in resolveInfos) {
                    val activityInfo = resolveInfo.activityInfo
                    packageNames.add(activityInfo.applicationInfo.packageName)
                }
            } else {
                Log.e(TAG, "Context is null, cannot get dialer packages")
            }

            return packageNames
        }
    }

    // Keep a reference to the latest root node
    private var _rootNode: AccessibilityNodeInfo? = null

    override fun onCreate() {
        super.onCreate()
        DTMFAccessibilityServiceSingleton.instance = this
    }

    override fun onDestroy() {
        super.onDestroy()
        DTMFAccessibilityServiceSingleton.instance = null
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event == null) {
            return
        }

        // Whenever there's a window content/state change, update our root node reference
        if (event.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED || event.eventType == AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED) {
            _rootNode = rootInActiveWindow
        }
    }

    override fun onServiceConnected() {
        super.onServiceConnected()
        DTMFAccessibilityServiceSingleton.instance = this
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        intent?.let {
            val action = it.getStringExtra("action")
            val buttonText = it.getStringExtra("button_text")

            if (action == "press_keypad_button" && buttonText != null) {
                pressKeypadButton(buttonText)
            }
        }

        return START_NOT_STICKY
    }

    /**
     * Heuristically checks if the current screen belongs to a known dialer or in-call UI.
     */
    private fun isInCallScreen(rootNode: AccessibilityNodeInfo): Boolean {
        val pkg = rootNode.packageName?.toString() ?: return false

        return KNOWN_DIALER_PACKAGES.any { pkg.contains(it, ignoreCase = true) }
    }

    /**
     * Check if the dial pad is open by searching for all digits 0-9 plus * and # in the hierarchy.
     */
    private fun areAllDigitsVisible(rootNode: AccessibilityNodeInfo): Boolean {
        val required = listOf("1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "*", "#")

        for (digit in required) {
            val nodesWithDigit = rootNode.findAccessibilityNodeInfosByText(digit)

            if (nodesWithDigit.isNullOrEmpty()) {
                return false
            }
        }

        return true
    }

    /**
     * Attempt to find a toggle button (by text or contentDescription) to open the dialpad.
     * If we already see digits on the screen, we skip toggling.
     */
    private fun openDialPadIfNeeded(rootNode: AccessibilityNodeInfo) {
        // If we already see the digits 0-9, #, * in the node tree, the dial pad is probably open
        val allDigitsPresent = areAllDigitsVisible(rootNode)

        if (allDigitsPresent) {
            return
        }

        // Otherwise, BFS to find a dialpad toggle
        val queue = ArrayDeque<AccessibilityNodeInfo>()
        queue.add(rootNode)

        while (queue.isNotEmpty()) {
            val node = queue.removeFirst()
            // Check text & contentDescription
            val textStr = node.text?.toString() ?: ""
            val descStr = node.contentDescription?.toString() ?: ""

            // If either text or contentDescription matches known keywords
            if (DIALPAD_TOGGLE_KEYWORDS.any { keyword ->
                    textStr.contains(keyword, ignoreCase = true) ||
                    descStr.contains(keyword, ignoreCase = true)
                }
            ) {
                if (node.isClickable) {
                    node.performAction(AccessibilityNodeInfo.ACTION_CLICK)
                    Thread.sleep(300)

                    return
                }
            }

            for (i in 0 until node.childCount) {
                node.getChild(i)?.let { queue.add(it) }
            }
        }

        Log.w(TAG, "Could not find any dialpad toggle button in the current UI.")
    }

    /**
     * Checks if a dialer button's text or contentDescription is relevant for this digit.
     * e.g. digit = "2" matches "2", "2 ABC", "2,ABC", "2." ...
     */
    private fun isDialerButtonMatch(nodeText: String?, digit: String): Boolean {
        if (nodeText == null || nodeText.isEmpty()) {
            return false
        }

        val escapedDigit = Regex.escape(digit)
        val pattern = Regex("^$escapedDigit[\\s,]*(.*)?$", RegexOption.IGNORE_CASE)

        return nodeText.matches(pattern)
    }

    /**
     * Find and click a single digit (0-9, *, #).
     * Returns true if the digit was successfully clicked, false otherwise.
     */
    private fun pressKeyDigit(rootNode: AccessibilityNodeInfo, digit: String): Boolean {
        // BFS
        val queue = ArrayDeque<AccessibilityNodeInfo>()
        queue.add(rootNode)

        while (queue.isNotEmpty()) {
            val node = queue.removeFirst()

            // Skip system UI or non-dialer packages
            val nodePackage = node.packageName?.toString() ?: ""
            if (!KNOWN_DIALER_PACKAGES.any { nodePackage.contains(it, ignoreCase = true) }) {
                // This node isn't from a recognized dialer package. Skip its subtree.
                continue
            }

            val textStr = node.text?.toString()
            val descStr = node.contentDescription?.toString()

            // If either text or contentDescription is a partial match
            if (isDialerButtonMatch(textStr, digit) || isDialerButtonMatch(descStr, digit)) {
                if (node.isClickable) {
                    node.performAction(AccessibilityNodeInfo.ACTION_CLICK)
                    Thread.sleep(300)

                    return true
                }
            }

            for (i in 0 until node.childCount) {
                node.getChild(i)?.let { queue.add(it) }
            }
        }

        return false
    }

    /**
     * External entry point:
     * 1) Check if we are in a known dialer UI
     * 2) Open the dial pad if needed
     * 3) Press the requested button
     */
    fun pressKeypadButton(dtmfString: String) {
        val rootNode = _rootNode ?: run {
            Log.w(TAG, "No root node available. Are we sure the dialer is in the foreground ?")

            return
        }

        if (!isInCallScreen(rootNode)) {
            Log.w(TAG, "We are not in a recognized in-call/dialer screen !")

            return
        }

        openDialPadIfNeeded(rootNode)

        if (dtmfString.matches(Regex("[0-9*#]"))) {
            var success = pressKeyDigit(rootNode, dtmfString)

            if (!success) {
                // We probably just opened the dial pad
                Thread.sleep(300)
                success = pressKeyDigit(rootNode, dtmfString)

                if (!success) {
                    Log.e(TAG, "Failed to press digit : $dtmfString")
                }
            }
        } else {
            Log.e(TAG, "Invalid DTMF char : $dtmfString")
        }
    }

    override fun onInterrupt() {
        DTMFAccessibilityServiceSingleton.instance = null
    }
}
```
```kotlin
// services/CallService.kt
// ...

    private fun sendDtmf(dtmf: String) {
        val intent = Intent(this, DTMFAccessibilityService::class.java)
        startService(intent)

        DTMFAccessibilityServiceSingleton.instance?.pressKeypadButton(dtmf)
    }
```
Time for some explanations once again :)
1. We created (quickly) a singleton to avoid creating another `DTMFAccessibilityService` object at each call.
2. We added a bit more possible names for the keypad button. *I'm sorry*, but if you want to use this code, you might need to i18n it depending on the countries you're targeting.
3. The detection of the call app name is way much improved ! We first get the list of package names from all installed apps that can handle calls on the phone, and add 3 common packages just in case.
4. Everytime we get an accessibility event (we added when the state of a window changes, and asked also for the "non important views"), we would edit a global root node that we process. This ensures reactivity to content changes (ex the keypad just opened or closed) and also helps us working on an always up to date node tree.
5. We also improved the detection of "visible" keypad elements (we require **all** of them to be apparent on the screen).
6. If the keypad isn't opened, we do a quick BFS on the root node to find the button and click on it.
7. When calling `pressKeypadButton()`, we perform all required actions (as before), and check if the DTMF symbol is an accepted one (technically `A-D` exists but nobody uses them) with `Regex("[0-9*#]")`.
8. We then call `pressKeyDigit()` to perform a BFS on the root node tree *again*, but this time to search for the DTMF's button. Note that we sleep 300ms after performing any click to let the UI (and root node object) update. We also take care of skipping anything where the buttons will not be present.
9. To be really sure, we check in the button's text **and** description for the content we search for with a good ol' regex : `"^$dtmf[\\s,]*(.*)?$"`.
  
Obviously, the DTMF button name is in the *description*, not the text ! For example, the button 2 have a null text, and `2,ABC` as a description.  
But we still had to do a quick change. You see, every button press worked, except `*`, which hanged up the call. Well it was because we had to escape it, as it matched any text on the regex !

## The end
It was really fun to make the code and write this blog post, but seriously frustrating that there is no standard API to do it in a non convoluted way, 17 years after the release of Android !  
I hope that this helped you to implement such a basic feature in your app (although working with accessibility services is a pain in the rear end), and don't hesitate to [follow me on random places](/#social) (feel free to start a convo).  
This blog will contain random writeups like this one (technical) and more random standard things too, thoughts, ...

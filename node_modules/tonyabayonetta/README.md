# My personal lib
## I make this for fun
## Be sure to convert your file to type 'module'
```html
<script type="module" src="main.js"></script>
```
### How to use alert:
1) import script:
```js
import CustomAlert from '/node_modules/tonyabayonetta/lib/templates/custom_alert/custom_alert.js'
```
2) add style:
```html
<link rel="stylesheet" href="node_modules\tonyabayonetta\lib\templates\custom_alert\custom_alert.css">
```
3) add alert in ur body( or main):
```js
const newAlert = new CustomAlert(document.querySelector('body'),'Your text')
// to remove use .toRemove(Your time) method of new class
// for example
newAlert.toRemove(5000) // alert be removed for 5 second
```
### How to use confirm:
1) import script:
```js
import CustomConfirm from '/node_modules/tonyabayonetta/lib/templates/custom_confirm/custom_confirm.js'
```
2) add style:
```html
<link rel="stylesheet" href="node_modules/tonyabayonetta/lib/templates/custom_confirm/custom_confirm.css">
```
3) add confirm in html document:
```js
const newConfirm = new CustomConfirm(document.querySelector('body'), {
    text: 'Your text',
    onTrue: () => {
        // If press 'Yes'
    },
    onFalse: () => {
        // if press 'No'
    }
})
// when user press on any one button, confirm be removed automatically
```
### How to use my requests:
1) import script:
```js
import * as request from '/node_modules/tonyabayonetta/lib/scripts/request.js'
```
#### XHR:
```js
request.tonyAjax({
    url: 'Your Url',
    method: 'PUT/POST/GET/DELETE' // default GET,
    body: {
        // json body
    },
    headers: {
        // json headers
    },
    params: {...}, // url search params 
    responseType: '...', // default json
    requestType: '...', // default json
    async: 'true/false', // default true
    onSuccess: (data) => {
        // to do if response status 201 - 299
        console.log(data)   // 'data' is the response from the server
        ...
    },
    onError: (data) => {
        // to do if response status is bad ( 299 +)
        console.log(data) // 'data' is the code of response
        ...
    }
})
```
#### Fetch
```js
request.tonyFetch({
    url: 'Your Url',
    method: 'PUT/POST/GET/DELETE' // default GET,
    body: {
        // json body
    },
    headers: {
        // json headers
    },
    params: {...}, // url search params 
    responseType: 'text/json', // default json
    onSuccess: (data) => {
        // to do if response status is OK
        console.log(data)   // 'data' is the response from the server
        ...
    },
    onError: (data) => {
        // to do if response status is bad 
        console.log(data) // 'data' is the code of response
        ...
    }
})
```
### How to use template engine
1) add script
```js
import templateEngine from '/node_modules/tonyabayonetta/lib/scripts/templateEngine.js'
```
2) then call the function
```js
const rawTemplate = {
    "tag": "div",
    "cls":  "mydiv",
    "attr": {
        "data-attr": "true",
        "href": "vk.com/tonybayonetta"
    },
    "content": {
        "tag": "h1",
        "content": "Hi!"
    }
}
// tag - is tag Name
// cls - is classes of this block (maybe an array)  -- ['class-first','class-second']
// attr - is attributes of this block ( format key - value)
// content - is content of this block, it may be an any one block or text node

const sample = templateEngine(rawTemplate)
document.querySelector('body').appendChild(sample)
```
#### we create next construction:
``` html
<div class="myDiv" data-attr="true" href="vk.com/tonybayonetta">
    <h1>
        Hi!
    </h1>
</div>
```

#### any sample
```js
document.querySelector('body').appendChild(templateEngine(sample()))

function sample() {
    return {
        "tag": "div",
        "cls":  "mydiv",
        "attr": {
            "data-attr": "true",
            "href": "vk.com/tonybayonetta"
        },
        "content": {
            "tag": "h1",
            "content": "Hi!"
        }
    }
}
``` 
### How to use my  HTML to Object engine
```html
    <section class="test test2" data-set="test" scr="vk.com/tonybayonetta">
        <div class="clock2" data-set="tester">
            <button class="clock">This Button</button>
        </div>
        <div>This Div</div>
    </section>
```
```js
import toObject from "../node_modules/tonyabayonetta/lib/scripts/toObjectEngine.js";

const section = toObject(document.querySelector('.test'))
```
#### the script will return an object of the following structure:
```js
// tag - this tag name
// cls - classes of this element
// attr - attributes of this element ( key - value)
// content - inner content of this element
{
  "attr": {
    "data-set": "test",
    "scr": "vk.com/tonybayonetta"
  },
  "cls": [
    "test",
    "test2"
  ],
  "tag": "section",
  "content": [
    {
      "attr": {
        "data-set": "tester"
      },
      "cls": [
        "clock2"
      ],
      "tag": "div",
      "content": [
        {
          "cls": [
            "clock"
          ],
          "tag": "button",
          "content": "This Button"
        }
      ]
    },
    {
      "tag": "div",
      "content": "This Div"
    }
  ]
}
```
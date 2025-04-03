# Experiment with Vue and Web components

The goal of this experiment is to understand how Vue is behaving, in particular regarding scripts loadings.

Interesting links:
* https://vuejs.org/guide/extras/web-components.html#vue-and-web-components

## Scenario

Two modules [vue-lib](./vue-lib) and [website](./website).
`vue-lib` is a library exposing two Vue components wrapped into Web Components. 
`test-app` and `child-with-style`, `test-app` is also using `child-with-style` in its template.
`website` depends on `vue-lib` and uses the provided web components in a simple [webpage](./website/index.html). The 
content of the webpage is: 

```html
<body>
<span class="a b">This is a test app</span>
<test-app></test-app>
<test-app></test-app>
<test-app></test-app>
<test-app></test-app>
<test-app></test-app>
<test-app></test-app>
<test-app></test-app>
<child-with-style></child-with-style>
<child-with-style></child-with-style>
</body>
```

The goal is to verify that:
* the style is correctly isolated
* the style are not loaded more than needed (i.e., no duplicated style bloating page size) 


## Results

* scoped style is only applied locally, as expected
* none scoped style is applied globally, but not outside the web components themselves (i.e., not on `<span class="a b">This is a test app</span>`) 
* what's returned when doing a GET http request on the web page is exactly what is presented above. The elements are 
  only enhanced with Javascript afterward.
* the size of the optimized Javascript 63.43 kB (including Vue's runtime)
* Vue does not produce a separate CSS file in the case of Web Components, instead the style is initialized using 
  `<style>` elements by Javscript (i.e., we can find code like `nl=".b{border:1px solid black}"` in the produced 
  Javascript).
  * the presence `<script>` elements on the *runtime* DOM might be an issue for linters
  * but I don't think this is an issue in term of brower runtime performance, and it is not an issue in term of 
    network usage since the CSS is loaded only once.

## Runtime dom of the `test-app` element


```html
<style>.b[data-v-4ff577b3] {
  text-decoration: line-through
}</style>
<style>.b {
  border: 1px solid black
}</style>
<style>.a[data-v-dfd199a5] {
  color: red
}</style>
<div data-v-dfd199a5="">
    <span data-v-dfd199a5="" class="a b">
      Hello World
    <span data-v-4ff577b3="" data-v-dfd199a5="" class="b">
      Hi I'm child!
    </span>
  </span>
  <span data-v-4ff577b3="" data-v-dfd199a5="" class="b">Hi I'm child!</span>
</div>
```

# Web Components Boilerplate

## Overview

Largely written as an experiment in the viability of web components, from the point of view of someone who's been writing pretty much exclusively ReactJS for the last however damn long.

Decided to take it even further as an experiment in how much the vanilla web has come in recent years by opting to use only CSS. I'm using Typescript, though, because I'm not some kind of luddite.

Designed to be as vanilla as possible, thus NPM wise, it's basically just Typescript, linting, and webpack - nothing that should have an effect during run time, or change the size of the final bundle. The only thing is the `@webcomponents/webcomponentsjs` polyfill, to enable support for all the cool web components stuff as far back as IE11.

## Prerequisites

-   npm
-   node

### Recommended

-   vscode
-   prettier vscode plugin
-   eslint vscode plugin
-   lit-html vscode plugin (we're not using lit html itself, but the vscode plugin allows some really good syntax hightlighting if you use the template tag html)

## Get Started

To get started, after cloning the repo, cd into the root and run

```
npm install
npm start
```

`npm install` will install the few necessary node modules to get this bad boy running, and `npm start` will begin building/serving the site out of `output/` using `webpack-dev-server`. While this is running, go to `localhost:8000` in a browser to see the served site.

## Development

Web Components are the amalgamation of a set of pretty new (and therefore not especially supported) vanilla Javascript APIs. Mainly, these are Custom Elements and the Shadow DOM. Combined with the HTML template tag, these allow the writing of encapsulated, reusable components, with lifecycle callbacks, enabling a vanilla development experience that, while not being quite as comprehensive feature-wise, is not too far away from writing using a component library like React or Angular.

For a much more in depth description, [this 5 part series from css tricks](https://css-tricks.com/an-introduction-to-web-components/) includes a lot of good information.

For my implementation, I've written a class found in `source/component.ts` which handles the rendering of imported html when added to the DOM or when an observed property changes. This class should be extended by other Web Components to avoid a tonne of boilerplating.

I've provided lifecycle methods which are called in the basic component lifecycle around the stuff I've written, allowing the new Component to hook into the render process in the base Class.

The extending class should redefine the method `getMarkup`, returning the string value of the html to render in the component. For easier development, I'd recommend using the lit-html vscode plugin, and using the string template tag exported from `source/component.ts`. This enables syntax highlighting and intellisense in the html string. Additionally, because this is a template string, any variable can be included in this string using the `${whatever this is called}` syntax. This can also be used to conditionally render html.

Changes to the attributes passed into the html tag of a web component, and also to the state defined by the component, will trigger the render method to run again, meaning that `getMarkup` can contain updating references to these.

I've also written a really basic client side routing component which takes a path attribute, and renders its children only if at that path.

## Drawbacks

-   ### Shared CSS

    Unfortunately, because the markup in Web Components sits in a shadow DOM, there's currently no decent way of accessing stuff in theme CSS, which, to me, feels like a huge oversight, seeing as you'll probably end up replicating a hell of a lot. They have access to CSS Custom Properties, which is good, but this doesn't really cut the mustard to me. There's a proposal that'll likely surface soon for CSS imports to be treated like ES modules, along with the new StyleSheet API spec, which'll kind of solve this, but it still means a lot of boilerplating.

    Another solution I've seen people touting to this is using CSS @imports, though apparently with the performance hit this brings when used in every component is prettttty hug.

-   ### State and Attribute Management

    As it stands, I'm using a really rudimentary React like state implementation, that'll queue up a rerender when setState is called. But in terms of passing attributes around in a way that's typesafe... I'm yet to come up with a good solution.

-   ### Typesafety

    Typesafety is a big issue generally with attributes. Attributes can't be typed properly, and essentially have to be `JSON.stringify`d and `JSON.parse`d to get anything other than a string in a attribute. I have a basic props implementation, but as it stands, everything is limited to being typed as a string and I can't really think of an elegant solution to that.

    Another big part of this issue is that, because this is just straight up HTML, there won't be a way of doing type checking when setting custom attributes in Web Components.

-   ### Dumb render is a dumb idiot

    Unlike React, which keeps track of which element is which through the virtual DOM when rerendering, the solution I've gone for for now is a total scrapping and recreating of the markup in the component. This is, of course, dumb. More than anything else, it means that anything that's gonna rerender is gonna be completely reinstantiated every time - basically, can't do anything with animations. This is my own shortcoming, mainly cus I'm not investing much time into this for now.

-   ### Support

    Bad

A lot of solutions, I'm sure, could be found to these problems by abstracting more stuff into the `CoolComponent` class. Generally, the issue, really, is boilerplating too much and with too much room for mistakes when doing this.

I'm sure I'll encounter a tonne more issues with this implementation if I ever actually use it for anything. Even more likely, is that if I use it for a bit, I'll find general shortcomings with the whole approach of trying to get Web Components to behave pretty much just like React, and end up coming up with a whole different approach to this.

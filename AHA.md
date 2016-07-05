# a-ha moments

I wasn't studying programming in a course or at the school but I'm passionate about it for more than 20 years (but most of the time not as a programmer but as a person who makes programs to solve my tasks).

I like to learn new things. Last couple of years I really like javascript. I had a couple of a-ha moments and here I'm sharing some of them with you.

It took me some time to learn them but it was more than worth of doing it. I'm sure more are still waiting for me to be discovered.


## Testing

Write tests, really. Because you will refactor your app, change it, extend it and things may (and will) break. Tests are here not to stress you but to give you confidence that things work as expected.

Writing tests is good for another reason. It helps you to **write better code**. When you write big functions, they are hard to test. Read [this article of Eric Elliot](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.d1du6s753).

To emphasize more the **write better code** it helps you write more pure functions. Pure functions are great (and easy to test). More about it later.

TDD - test driven development - writing tests first - is nice idea but you don't have to be purist about it. Just don't forget the tests. Because you know what output should be with what input - so write this down and make a test around it once you have your code. Easy.


## Webpack

First time I looked at webpack I dismissed it as too complicated for me. Gulp looks much more frendlier (it's code after all). When you look into webpack config of some boilerplate, you may be scared. Don't be. Webpack is worth of the pain of learning it (at least to the point you can use it).

Start with some easy tutorial to get the basic concept. Then add things you need. I think you don't have to be able to write webpack config by yourself but you should know what's (roughly) happening there and how to add things you need. It is widely used tool so still you will need to know it at least a little if you want to write code and have new jobs.


## Code linting

I can't imagine to write code "blindly" again. For me linting is about catching 90% of bugs during writing. You import the module that is not present? You are using variable that was not declared (because of typo)? Tons of similar situations... solved fast and easy.

Again - it helps you write better code. A lot of clever people with much longer programming experience put a lot if it into linting tools and presets. I use modified airbnb preset. It leaded me to the best prctices of airbnb for coding and it was [a great read](https://github.com/airbnb/javascript).


## Editor

"Master your tools" is one of my favorite quote. How many times you see someone using a tool for hours per day without trying tobe effective with it. No patter if it is a excel, browser or [axe](http://www.brainyquote.com/quotes/quotes/a/abrahamlin109275.html).

Editor is where you spend most of the time. Choose one, learn it and customize it. Don't be paralyzed by the fact that there is no 100% ideal editor.

Editor is your front-end to code, linting, fast searching, navigating within code, editing, git commands, ... Learn it as much as you can.

I use Atom editor. It's not perfect but it has a great community behind. I loved to use Sublime Text (it's much faster) but after a couple of switching between Atom and ST I ended with Atom because of community and openness.


## Babel

Learn the ES6/7 syntax.

This is not about "being cool". It is about being productive. You want to write better code, right? So use it.

And to be able to read the code of others who use it.

Babel again is a tool (like webpack) that may leave you puzzled. It is rapidly evolving and some howtos 6 months old are not best practices now but things are better and better, really.


## Pure functions (and functional programming)

I met them with React, dumb components and arrow syntax in ES6. And learn more about them (and you should, too - like in [this article](https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4#.9ilfchlrl)).

They are easier to test, they are easier to debug, they are more predictable, ... and many more benefits. Once you start thinking about pure functions (and side effects), you start to write better and more maintainable code.

Most of the react components you can write as pure functions (and as stated by React team, these components will be optimized in the future).

Don't be scared by the word functional programming. Just start thinking with .map, .filter, .reduce in mind instead of for-loops. This is a good start. Then you may be enchanted by RxJS. Why? Because all these concepts are interesting and at least learning about them and making something small with them will expand your knowledge. Beware - some of them are addictive ;)


## READ THE CODE

[We are standing on the shoulders of the giants](https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants).

It would be a shame not to learn from the masters. Read code of amazing libraries. Learn how they work. Study the structure of the code. They know, you learn.

For me [starting with redux](https://egghead.io/courses/getting-started-with-redux) is amazing (free) course not only about redux but about thinking in code and how things works.

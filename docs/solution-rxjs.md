# test task - clients list - RxJS way

David Cizek
github: [@dacz](https://github.com/dacz)
contact on twitter: [@dadc](https://twitter.com/dadc)



## Solution

This solution is a clone of [solution the redux way](./solution-redux.md). So please read this to get general overview of the solution.

**Use branch `rxjs` of the repo.**

**How to run (webpack development server)**
```
npm install
npm run dev
```

Open http://localhost:8080.



## Comments on RxJS

[ToDo]

Generally I'm fan of RxJS and reactive/functional programming. I'm newbie yet.

The solution heavily borrows from [amazing article of Michal Zalecki](http://michalzalecki.com/use-rxjs-with-react/). Read it. I had to read it many times to get into the differences between redux and RxJS solution (and get better understanding of RxJS).


## Reducers:

There is just one simple reducer.


## Actions:

The actions are... just Rx.Subjects.


## Store:

There is no store. Just state. Yep.


## Provider and Connect

I wrote my own Provider and ConnectWithState (a lot of copy-paste from Michal Zalecki and Redux).


## Remarks:

I plan to write something more universal with Provider and Connect etc. Inspired by Redux. Maybe some screencast because I did not find anything so simple as Michal's article. Again - inspired by Dan Abramov - creator of Redux.


## TODO and Nice to have

See the Redux solution.


## Time spent

I'm not recording the time on RxJS. For me it is a lot about learning.

Generally (rewriting the redux to RxJS) took me approx. 2 hours but I do not count in the time playing with RxJS primitives and additional time to learn more about RxJS.


## Build size

When built with webpack prod setting, it's 216kB gzipped (bundle.js). I did not optimized RxJS importing, yet (import only what I use) or checked webpack 2 with tree shaking optimization.


### Contact

Do you like the way I'm working? I'm available for hire.

David Cizek
github: [@dacz](https://github.com/dacz)
contact on twitter: [@dadc](https://twitter.com/dadc)

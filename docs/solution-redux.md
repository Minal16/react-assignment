# test task - clients list - Redux way

David Cizek
github: [@dacz](https://github.com/dacz)
contact on twitter: [@dadc](https://twitter.com/dadc)



## Solution

**React/redux** based solution, testing with [ava](https://github.com/avajs/ava). Router (and location manipulation) was not used - not required to have links to views.

*Note/new: RxJS version has it's own branch and [solution readme](./solution-rxjs.md).*


**Building:** [webpack](https://webpack.github.io/).

**Styles:** [css modules](https://github.com/css-modules/css-modules) and [cssnext](http://cssnext.io/). I was a fan of scss (and still am). But css modules forces you to go the right direction - away from cascading hell and toward easier maintainable css. [Read this](http://glenmaddern.com/articles/css-modules).

I used [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes) for general structure. The [support](http://caniuse.com/#search=flex) is good (but beware on IE specificity).

**Linting:** [eslint](http://eslint.org/) and [stylelint](http://stylelint.io/).

_For testing against express server, I included source of stripped down server and compiled source. Dependencies are not in package.json, because it was not in the specs and I did not want to bloat package.json. To run it without webpack development server run `npm run server` but you need to build the project first with `npm run build`._

**How to run (webpack development server)**
```
npm install
npm run start
```

Open http://localhost:8080.


### About using CSS modules

I see using css modules with cssnext cleaner solution for react apps than maintaining css or scss files separated from the components. But if the designer delivers scss or css, they can be used (or refactored into modules).


## Comments on functionality

There is no need to "submit" button within search.

I decided to start filtering with first letter (not wait for at least 2char long string or so). The search is not expensive and doesn't represent http communication (hence to be optimized even from the latency time). For the same reason I did not implemented debouncing (from lodash lib).

When some item is selected and search is started and selected contact doesn't match, it is deselected.


## Reducers:

* clients (state: data {}, status: string, ts: timestamp)
* filter (string)
* selectedClient (string)


## Actions:

FSA (modified) actions structure:

* action.type
* action.payload (data)
* action.error

### Actions in app:

* fetchClients(async)
* RECEIVED_INITIAL_CLIENTS_DATA (payload: array from received json, err)
* SELECT_CLIENT (payload: id of the client)
* SET_FILTER (payload: string submitted by the user)


## Remarks:

Clients should have IDs assigned from the server. I implemented them, just index of clients array with name and surname, in the form of slug. Simple [array index is anti-pattern to be used with react keys](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318#.4fjozye1n)

The build process for production should be optimized to generate smaller bundle. Currently are logger middleware included and app logs out to the console - not desirable in production.


## TODO

* make it responsive. Was not requirement but everything should be responsible, if considered to be used as web app
* should use library for proper slugging, because names may contain url dangerous characters (like non latin1 characters)
* testing fetch function (currently private within actions)
* add timeout to fetch. Not part of the fetch, so use something like from [this discussion](https://github.com/github/fetch/issues/175).
* should define propTypes of client data structure in detail (would depend on real implementation of clients data)
* in details (right pane) - display sections with data conditionally if data exist or not
* adding some shortcuts to select find field, move within list etc.
* check the code coverage (add react components test with enzyme)
* when search returns empty list, in the detail pane should NOT be the message currently displayed (Select awesome person from the left)


## Nice to have (to be considered)

* highlight search string within record detail
* adding icons to email/phone to signalize that actions are available
* adding big tooltip to phone number (when someone needs to call, it's good to see it clearly - inspired by Apple Contacts).


## Time spent

Time spent | Doing
-----------|-----------
60 minutes | thinking about and modifying own basic template (react-redux boilerplate)
60 minutes | working on reducers, actions and tests
30 minutes | added id generation
90 minutes | state handling for async fetch and actions tests
60 minutes | preparing basic structure in css modules and dummy components
60 minutes | start populating components and activating fetch
45 minutes | styling of the list and setting up selectClient event
90 minutes | styling detail part
30 minutes | make search components live with state (not filtering, yet)
90 minutes | making the filter, tests and implementing it into the components (fixing some warnings)
60 minutes | puzzled by error on Safari (list wasn't displaying). The problem was the not the js code (data was here but not visible) but css (safari different implementation of flexbox). Just one additional css rule fixed it. Oh well, 1 hour gone.
30 minutes | cleaning up, extracting some values into css variables
30 minutes | building the server, building the client and testing it against Safari, Chrome and Firefox.

Time raw summary (with comments):

* Preparation: 1 hour
* Coding: 7 hours (including tests)
* Styling: 2 hours 45 minutes
* Banging my head against the wall: 1 hour (css inconsistence)
* Building and testing 30 minutes (general testing here, I tested thorough the development, of course)

Grand total: 12 hours and 45 minutes.

Debugging (1 hour lost with css inconsistence) is unusual. Should not be repeated (but usually happens in every project :)).

Suppose that designer is hired to style the app, so probably the styling will be minimal (reduced to communication with designer).

Building and testing - depends on the delivery process (part of bigger app and separate build process, CI etc.).


## Update

in my free time I'm enhancing the repo.

I do not record time since the initial commit. I'm learning along the way a lot and how should I proper log the time?

Recent updates:

* better structure of webpack config

**Branch using RxJS is available**


### Contact

Do you like the way I'm working? I'm available for hire.

David Cizek
github: [@dacz](https://github.com/dacz)
contact on twitter: [@dadc](https://twitter.com/dadc)

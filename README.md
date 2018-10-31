# Udacity MyReads Project

With the MyReads app, you can search for and categorize books into three different bookshelves:
"Currently reading", "Want to read", and "Read".


## Getting started

Follow these steps to get a copy of the project running on your local machine


### Installing

You will need a Windows, Mac, or Linux based operating system and access to the internet in order to run this project.
Either clone or download and unzip the files to your local directory. After downloading:

* install all project dependencies with `npm install`
* start the development server with `npm start`


###  Dependencies

In order for your MyReads app to function properly, the following packages and files must be in place.
Please verify that your local directory has the following:

#### In the `src` folder

* App.js _This is the root of the app_
* ShowBooks.js, SearchBooks.js, and EachBook.js _These are the component files_
* BooksAPI.js _This is the backend of the app, which manipulates Udacity's API_


#### In the `node_modules` folder

You will also need the following packages, which should be included in your download:

* prop-types
* react-router-dom
* sort-by

If any of these packages are missing, please see the _Troubleshooting_ section of this file
Finally, this app also makes use of [Google fonts](http://fonts.googleapis.com/)


## Using MyReads

Selecting a bookshelf (or none) for any book on the home page relocates that book. In the lower right corner,
you can navigate to the search page.

The input field on the search page ignores all numbers and symbols. Please see the list of available search terms in [SEARCH_TERMS.md](SEARCH_TERMS.md). These are the _only_ queries that will yield any matches (So if you search for _funky monkeys_ and don't get any results, don't say I didn't warn you).

Select a bookshelf on any book in your search results to add them to the main page.


## Troubleshooting The App

First, check that the `node_modules` folder contains the following packages:

* prop-types
* react-router-dom
* sort-by

If you do _not_ have those folders, you must download them. Using your terminal or git bash, enter the following commands:

Use `$ npm install --save prop-types` for PropTypes
Use `$ npm install --save react-router-dom` for react-router-dom
Use `$ npm install --save sort-by` for sortBy


If you have those folders, check these three files and add the following lines _only if_ they are absent.

#### `App.js`

Please verify you have the following lines at the top of the file:

```
import { Route } from 'react-router-dom'
import ShowBooks from './ShowBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
```


#### `ShowBooks.js`

Please verify you have the following lines at the top of the file:

```
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import EachBook from './EachBook.js'
```


#### `SearchBooks.js`

Please verify you have the following lines at the top of the file:

```
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import EachBook from './EachBook.js'
import * as BooksAPI from './BooksAPI'
```


#### `EachBook.js`

Please verify you have the following lines at the top of the file:

```
import PropTypes from 'prop-types'
```

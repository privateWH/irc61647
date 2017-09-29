# This is for OHSU IRC61647 by Weinian He
The project is written in PHP, JavaScript, CSS and HTML5. It uses ReactJS, Axios and WebPack.

All codes are writen from scratch in 3 nights roughly 15 hours. The allocation of time is roughly 30% for learning ReactJs (all new), 49% for writting code, 1% for thinking about design and structure, 20% for testing and debugging.  Manual tested with: PostMan, https://regex101.com, Chrome DevTool. 

## Feature Completed:
- Add, Remove, Get in frontend.
- Utilizes external CSS for style, filter through Webpack.
- Add, Remove, Update, Delete, Get (Sort By Key, Sort Order, Pagation, Filter) Save Data in Backend.

## Summary

The backend code works with PHP5+, frontend code goes through Babel transpile to ES2005.

### Folder structure:
#### Frontend
- dir:frontend contain code for frontend, key files:
  - ConcreteDataTable.jsx, orchastrates all the events, life-cycles of the UI. 
    - Comments: The only React.component class should have done it with React.createClass to keep it simple but first attempt.
  - IRC61647DataTable.jsx, implementation of  the full functional table UI DSL. 
    - Comments: is not data-driven for conditional render of component yet. I.e. Editing rows by swapping DataTableBodyRow with DataTableBodyUpdateRow for example. 
  - DataAPI.jsx, communicate with the backend it dependented on axios library 
    - Comments: I think the abilities to abort request is essential, my first attempt was with fetch API but ditched after realize is not compatible with old IE and can't abort request.
  - BasicDataTable.jsx (not used in current build) 
    - Comments: It's historic significant, first attempt with Stateless Component. It turns out to just a simple DSL for Table creation.)
    
#### Backend
- dir:classes contain code for backend using (MVC, Factory and Singleton pattern), key files:
  - router.php, implementation of accepting calls and wires to the proper controller.
  - dir:DataRepository contains code for entry point to get various data by sourceId.
    - DataSourceIRC61647.php, implementation for dataSourceId=1 with JSON.
      - Comments: It will probably look good on resume when implement it with MySQL database, but I want to write my own database that incorporate ideas from Graph Node, NoSQL, RSDM, Shaded Hash (Geek out with DSL and Algorithms) so low priority for MySQL attempt.
  - dir:Controller contains IndexController, DataController, and NoPathFoundController. 
- dir:web is the root directory for backend with router script index.php.
- dir:web/assets is repository for storing frontend code when no CDN is used. 

## TODO:
- Tweak Batch processing by automatically detect array of object instead of object to Add, Update.
- Beautify the DataTable DSL, allow different themes by swapping classNames. 
- Add Toaster or PopUp notify to have nicer UI. 
- Add router to have different pages, just for fun.
- Look at the patent for https://facebook.github.io/fixed-data-table/ and see how they do it.
- Implement my own unit testing tool:
  - Specialized catagorical data generation. Randomizer, Edge Cases.
  - Assertion with auto textual extraction.
  - Performance Report.
  - Maybe behavioral testing. just another set of language to learn.
  
## Lessons Learn:
- Keep it simple and high performance by implementing DSL for the UI over customizable data driven compoenents, costly to implement DLS though.




MIT License

Copyright (c) [2017] [Weinian He]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

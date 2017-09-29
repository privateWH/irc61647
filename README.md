# This is for OHSU IRC61647 by Weinian He
The project is written in PHP, JavaScript. It uses ReactJS and WebPack Only.

All codes are writen from scratch in 3 nights roughly 15 hours. Roughly 30% of time learning ReactJs (all new), 49% of time writting code, 1% of time think about design pattern, 20% testing and debugging.  Didn't implement own UnitTest framework (Auto DataGen, Assertion) so only use PostMan, https://regex101.com, Chrome DevTool to do manual testing. 

The backend code works with PHP5+, frontend code goes through Babel transpile to ES2005.

Folder structure:
- dir:frontend contain code for frontend, key files:
  - ConcreteDataTable.jsx, orchastrates all the events, life-cycles of the UI. 
    - Comments: The only React.component class should have done it with React.createClass to keep it simple but first attempt.
  - IRC61647DataTable.jsx, implementation of  the full functional table UI DSL. 
    - Comments: is not data-driven for conditional render of component yet. I.e. Editing rows by swapping DataTableBodyRow with DataTableBodyUpdateRow for example. 
  - DataAPI.jsx, communicate with the backend it dependented on axios library 
    - Comments: I think the abilities to abort request is essential, my first attempt was with fetch API but ditched after realize is not compatible with old IE and can't abort request.
  - BasicDataTable.jsx (not used in current build) 
    - Comments: It's historic significant, first attempt with Stateless Component. It turns out to just a simple DSL for Table creation.)
- dir:classes contain code for backend using (MVC, Factory and Singleton pattern), key files:
  - router.php, implementation of accepting calls and wires to the proper controller.
  - dir:DataRepository contains code for entry point to get various data by sourceId.
    - DataSourceIRC61647.php, implementation for dataSourceId=1 with JSON.
      - Comments: It will probably look good on resume when implement it with MySQL database, but I want to write my own database that incorporate ideas from Graph Node, NoSQL, RSDM, Shaded Hash (Geek out with DSL and Algorithms) so low priority for MySQL attempt.
  - dir:Controller contains IndexController, DataController, and NoPathFoundController. 
- dir:web is the root directory for backend with router script index.php.
- dir:web/assets is repository for storing frontend code when no CDN is used. 




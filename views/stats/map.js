function (doc) {
  /*jshint couch:true*/
  "use strict";
  if (doc.type === "data_management_form" && !doc.deleted){
    var lib, visitDate, value;
    lib = {
      counties : {
        "abanda" : "Chambers",
        "abbeville" : "Henry",
        "abel" : "Clay",
        "abernant" : "Tuscaloosa",
        "acmar" : "St. Clair",
        "ada" : "Montgomery",
        "adamsville" : "Jefferson",
        "addison" : "Winston",
        "adger" : "Jefferson",
        "akron" : "Hale",
        "alabama city" : "Etowah",
        "alabama port" : "Mobile",
        "alabaster" : "Shelby",
        "alberta" : "Wilcox",
        "albertville" : "Marshall",
        "alden" : "Jefferson",
        "alexander city" : "Tallapoosa",
        "alexandria" : "Calhoun",
        "aliceville" : "Pickens",
        "allen" : "Clarke",
        "allgood" : "Blount",
        "alma" : "Clarke",
        "almond" : "Randolph",
        "alpine" : "Talladega",
        "alton" : "Jefferson",
        "altoona" : "Etowah",
        "andalusia" : "Covington",
        "anderson" : "Lauderdale",
        "anne manie" : "Wilcox",
        "anniston" : "Calhoun",
        "aquilla" : "Washington",
        "arab" : "Marshall",
        "ardmore" : "Limestone",
        "argo" : "St. Clair",
        "ariton" : "Dale",
        "arkadelphia" : "Cullman",
        "arley" : "Winston",
        "arlington" : "Wilcox",
        "armstrong" : "Bullock",
        "ashford" : "Houston",
        "ashland" : "Clay",
        "ashville" : "St. Clair",
        "athens" : "Limestone",
        "atmore" : "Escambia",
        "attalla" : "Etowah",
        "auburn" : "Lee",
        "autaugaville" : "Autauga",
        "avon" : "Houston",
        "awin" : "Wilcox",
        "axis" : "Mobile",
        "babbie" : "Covington",
        "baileyton" : "Cullman",
        "bakerhill" : "Barbour",
        "ballplay" : "Etowah",
        "bangor" : "Blount",
        "banks" : "Pike",
        "bankston" : "Fayette",
        "barfield" : "Clay",
        "barlow" : "Washington",
        "barnett's crossroads" : "Escambia",
        "barney" : "Walker",
        "bassetts creek" : "Washington",
        "battens crossroads" : "Geneva",
        "bay minette" : "Baldwin",
        "bayou la batre" : "Mobile",
        "bazemore" : "Fayette",
        "bear creek" : "Marion",
        "beatrice" : "Monroe",
        "beaverton" : "Lamar",
        "belgreen" : "Franklin",
        "belk" : "Fayette",
        "bellamy" : "Sumter",
        "belle fontaine" : "Mobile",
        "belle mina" : "Limestone",
        "belleville" : "Conecuh",
        "bellwood" : "Geneva",
        "benton" : "Lowndes",
        "berry" : "Fayette",
        "bessemer" : "Jefferson",
        "beulah" : "Covington",
        "big cove" : "Madison",
        "bigbee" : "Washington",
        "billingsley" : "Autauga",
        "birmingham" : "Jefferson",
        "birmingport" : "Jefferson",
        "black" : "Geneva",
        "bladon springs" : "Choctaw",
        "blount springs" : "Blount",
        "blountsville" : "Blount",
        "blue ridge" : "Elmore",
        "blue springs" : "Barbour",
        "bluff" : "Fayette",
        "boaz" : "Marshall",
        "boligee" : "Greene",
        "bolinger" : "Choctaw",
        "bolling" : "Butler",
        "bon air" : "Talladega",
        "bon secour" : "Baldwin",
        "booth" : "Autauga",
        "boykin" : "Wilcox",
        "bradford" : "Jefferson",
        "bradley" : "Covington",
        "braggs" : "Lowndes",
        "branchville" : "St. Clair",
        "brantley" : "Crenshaw",
        "brantleyville" : "Shelby",
        "bremen" : "Cullman",
        "brent" : "Bibb",
        "brewton" : "Escambia",
        "bridgeport" : "Jackson",
        "brierfield" : "Bibb",
        "brighton" : "Jefferson",
        "brilliant" : "Marion",
        "bristow cove" : "Etowah",
        "bromley" : "Baldwin",
        "brook highland" : "Shelby",
        "brooklyn" : "Conecuh",
        "brookside" : "Jefferson",
        "brooksville" : "Blount",
        "brookwood" : "Tuscaloosa",
        "broomtown" : "Cherokee",
        "browns" : "Dallas",
        "brownsboro" : "Madison",
        "brundidge" : "Pike",
        "bryant" : "Jackson",
        "bucks" : "Mobile",
        "buena vista" : "Monroe",
        "buhl" : "Tuscaloosa",
        "bull slough" : "Conecuh",
        "burkville" : "Lowndes",
        "burmuda" : "Conecuh",
        "burningtree mountain" : "Morgan",
        "burnt corn" : "Monroe",
        "burntout" : "Franklin",
        "burnwell" : "Walker",
        "butler" : "Choctaw",
        "caddo" : "Lawrence",
        "cahaba" : "Dallas",
        "calera" : "Shelby",
        "calvert" : "Washington",
        "camden" : "Wilcox",
        "camp hill" : "Tallapoosa",
        "campbell" : "Clarke",
        "capshaw" : "Limestone",
        "carbon hill" : "Walker",
        "cardiff" : "Jefferson",
        "carlisle-rockledge" : "Etowah",
        "carlton" : "#VALUE!",
        "carolina" : "Covington",
        "carrollton" : "Pickens",
        "castleberry" : "Conecuh",
        "catherine" : "Wilcox",
        "cecil" : "Montgomery",
        "cedar bluff" : "Cherokee",
        "center point" : "Jefferson",
        "centerville" : "Conecuh",
        "centre" : "Cherokee",
        "centreville" : "Bibb",
        "chancellor" : "Geneva",
        "chapman" : "Butler",
        "chatom" : "Washington",
        "chelsea" : "Shelby",
        "cherokee" : "Colbert",
        "chickasaw" : "Mobile",
        "childersburg" : "Talladega",
        "choccolocco" : "Calhoun",
        "chunchula" : "Mobile",
        "citronelle" : "Mobile",
        "clanton" : "Chilton",
        "claud" : "Elmore",
        "clay" : "Jefferson",
        "clayhatchee" : "Dale",
        "clayton" : "Barbour",
        "cleveland" : "Blount",
        "clio" : "Barbour",
        "clopton" : "Dale",
        "cloverdale" : "Lauderdale",
        "coaling" : "Tuscaloosa",
        "coats bend" : "Etowah",
        "coden" : "Mobile",
        "coffee springs" : "Geneva",
        "coffeeville" : "Clarke",
        "coker" : "Tuscaloosa",
        "collinsville" : "DeKalb",
        "colony" : "Cullman",
        "columbia" : "Houston",
        "columbiana" : "Shelby",
        "concord" : "Jefferson",
        "cook springs" : "St. Clair",
        "coosada" : "Elmore",
        "cordova" : "Walker",
        "corner" : "Jefferson",
        "cottondale" : "Tuscaloosa",
        "cottonton" : "Russell",
        "cottonwood" : "Houston",
        "county line" : "Blount",
        "courtland" : "Lawrence",
        "cowarts" : "Houston",
        "coy" : "Wilcox",
        "cragford" : "Clay",
        "crane hill" : "Cullman",
        "crawford" : "Russell",
        "creola" : "Mobile",
        "cromwell" : "Choctaw",
        "cropwell" : "St. Clair",
        "crosston" : "Jefferson",
        "crossville" : "DeKalb",
        "cuba" : "Sumter",
        "cullman" : "Cullman",
        "cullomburg" : "Choctaw",
        "cusseta" : "Chambers",
        "dadeville" : "Tallapoosa",
        "daleville" : "Dale",
        "dallas" : "Blount",
        "danville" : "Morgan",
        "daphne" : "Baldwin",
        "dauphin island" : "Mobile",
        "daviston" : "Tallapoosa",
        "dawson" : "DeKalb",
        "dayton" : "Marengo",
        "de armanville" : "Calhoun",
        "deatsville" : "Elmore",
        "decatur" : "Morgan",
        "deer park" : "Washington",
        "delmar" : "Winston",
        "delta" : "Clay",
        "demopolis" : "Marengo",
        "detroit" : "Lamar",
        "dickinson" : "Clarke",
        "dixiana" : "Jefferson",
        "dixons mills" : "Marengo",
        "docena" : "Jefferson",
        "dodge city" : "Cullman",
        "dolomite" : "Jefferson",
        "dora" : "Walker",
        "dothan" : "Houston",
        "double springs" : "Winston",
        "douglas" : "Marshall",
        "dozier" : "Crenshaw",
        "duncanville" : "Tuscaloosa",
        "dunnavant" : "Shelby",
        "dutton" : "Jackson",
        "east brewton" : "Escambia",
        "east point" : "Cullman",
        "eastaboga" : "Calhoun",
        "eclectic" : "Elmore",
        "edgewater" : "Jefferson",
        "edwardsville" : "Cleburne",
        "egypt" : "Etowah",
        "eight mile" : "Mobile",
        "elba" : "Coffee",
        "elberta" : "Baldwin",
        "eldridge" : "Walker",
        "elgin" : "Lauderdale",
        "elkmont" : "Limestone",
        "elmore" : "Elmore",
        "emelle" : "Sumter",
        "emerald mountain" : "Elmore",
        "empire" : "Walker",
        "enterprise" : "Coffee",
        "epes" : "Sumter",
        "equality" : "Coosa",
        "ethelsville" : "Pickens",
        "eufaula" : "Barbour",
        "eunola" : "Geneva",
        "eutaw" : "Greene",
        "eva" : "Morgan",
        "evergreen" : "Conecuh",
        "excel" : "Monroe",
        "fairfield" : "Jefferson",
        "fairford" : "Washington",
        "fairhope" : "Baldwin",
        "fairview" : "Cullman",
        "falkville" : "Morgan",
        "faunsdale" : "Marengo",
        "fayette" : "Fayette",
        "fayetteville" : "Talladega",
        "fitzpatrick" : "Bullock",
        "five points" : "Chambers",
        "flat rock" : "Jackson",
        "flomaton" : "Escambia",
        "florala" : "Covington",
        "florence" : "Lauderdale",
        "foley" : "Baldwin",
        "forestdale" : "Jefferson",
        "forkland" : "Greene",
        "fort deposit" : "Lowndes",
        "fort mcclellan" : "Calhoun",
        "fort mitchell" : "Russell",
        "fort morgan" : "Baldwin",
        "fort payne" : "DeKalb",
        "fort rucker" : "Dale",
        "franklin" : "Macon",
        //"franklin" : "Monroe",
        "fredonia" : "Chambers",
        "frisco city" : "Monroe",
        "fruitdale" : "Washington",
        "fruithurst" : "Cleburne",
        "fulton" : "Clarke",
        "fultondale" : "Jefferson",
        "fyffe" : "DeKalb",
        "gadsden" : "Etowah",
        "gainesville" : "Sumter",
        "gallant" : "Etowah",
        "gallion" : "Hale",
        "gantt" : "Covington",
        "garden city" : "Cullman",
        "gardendale" : "Jefferson",
        "gaylesville" : "Cherokee",
        "geiger" : "Sumter",
        "geneva" : "Geneva",
        "georgiana" : "Butler",
        "geraldine" : "DeKalb",
        "gilbertown" : "Choctaw",
        "glen allen" : "Fayette",
        "glencoe" : "Etowah",
        "glenwood" : "Crenshaw",
        "goldville" : "Tallapoosa",
        "good hope" : "Cullman",
        "goodwater" : "Coosa",
        "gordo" : "Pickens",
        "gordon" : "Houston",
        "gordonville" : "Lowndes",
        "gorham's bluff" : "Jackson",
        "goshen" : "Pike",
        "grady" : "Montgomery",
        "graham" : "Randolph",
        "grand bay" : "Mobile",
        "grant" : "Marshall",
        "grayson valley" : "Jefferson",
        "graysville" : "Jefferson",
        "green pond" : "Bibb",
        "greenhill" : "Lauderdale",
        "greensboro" : "Hale",
        "greenville" : "Butler",
        "grimes" : "Dale",
        "grove hill" : "Clarke",
        "grove oak" : "DeKalb",
        "gu-win" : "Marion",
        "guin" : "Marion",
        "gulf shores" : "Baldwin",
        "gulfcrest" : "Mobile",
        "gum springs" : "Blount",
        "guntersville" : "Marshall",
        "gurley" : "Madison",
        "hackleburg" : "Marion",
        "hackneyville" : "Tallapoosa",
        "haleburg" : "Henry",
        "haleyville" : "Winston",
        "hamilton" : "Marion",
        "hammondville" : "DeKalb",
        "hanceville" : "Cullman",
        "harpersville" : "Shelby",
        "hartford" : "Geneva",
        "hartselle" : "Morgan",
        "harvest" : "Madison",
        "hatton" : "Lawrence",
        "hayden" : "Blount",
        "hayneville" : "Lowndes",
        "hazel green" : "Madison",
        "headland" : "Henry",
        "heath" : "Covington",
        "heflin" : "Cleburne",
        "helena" : "Shelby",
        "henagar" : "DeKalb",
        "higdon" : "Jackson",
        "highland home" : "Crenshaw",
        "highland lake" : "Blount",
        "highland lakes" : "Shelby",
        "hillsboro" : "Lawrence",
        "hissop" : "Coosa",
        "hobson" : "Washington",
        "hobson city" : "Calhoun",
        "hodges" : "Franklin",
        "hokes bluff" : "Etowah",
        "hollins" : "Clay",
        "hollis crossroads" : "Cleburne",
        "holly pond" : "Cullman",
        "hollywood" : "Jackson",
        "holt" : "Tuscaloosa",
        "holtville" : "Elmore",
        "holy trinity" : "Russell",
        "homewood" : "Jefferson",
        "hoods crossroads" : "Blount",
        "hoover" : "Jefferson",
        "hope hull" : "Montgomery",
        "horn hill" : "Covington",
        "houston" : "Wintson",
        "hueytown" : "Jefferson",
        "huguley" : "Chambers",
        "hulaco" : "Morgan",
        "huntsville" : "Madison",
        "hurtsboro" : "Russell",
        "hytop" : "Jackson",
        "ider" : "DeKalb",
        "indian springs village" : "Shelby",
        "inverness" : "Bullock",
        //"inverness" : "Shelby",
        "irondale" : "Jefferson",
        "irvington" : "Mobile",
        "ivalee" : "Etowah",
        "jack" : "Coffee",
        "jackson" : "Clarke",
        "jacksons' gap" : "Tallapoosa",
        "jacksonville" : "Calhoun",
        "jasper" : "Walker",
        "java" : "Coffee",
        "jemison" : "Chilton",
        "joppa" : "Cullman",
        "kansas" : "Walker",
        "kellerman" : "Tuscaloosa",
        "kellyton" : "Coosa",
        "kennedy" : "Lamar",
        "kent" : "Elmore",
        "killen" : "Lauderdale",
        "kimberly" : "Jefferson",
        "kimbrough" : "Wilcox",
        "kinsey" : "Houston",
        "kinston" : "Coffee",
        "knoxville" : "Greene",
        "la fayette" : "Chambers",
        "lacey's spring" : "Morgan",
        "lacon" : "Morgan",
        "ladonia" : "Russell",
        "lake purdy" : "Shelby",
        "lake view" : "Tuscaloosa",
        "lakeview" : "DeKalb",
        "lanett" : "Chambers",
        "langston" : "Jackson",
        "le moyne" : "Mobile",
        "leeds" : "Jefferson",
        "leesburg" : "Cherokee",
        "leighton" : "Colbert",
        "lenox" : "Conecuh",
        "leroy" : "Washington",
        "lester" : "Limestone",
        "letohatchee" : "Lowndes",
        "level plains" : "Dale",
        "lexington" : "Lauderdale",
        "libertyville" : "Covington",
        "lillian" : "Baldwin",
        "lincoln" : "Talladega",
        "linden" : "Marengo",
        "lineville" : "Clay",
        "lipscomb" : "Jefferson",
        "lisman" : "Choctaw",
        "littleville" : "Colbert",
        "livingston" : "Sumter",
        "loachapoka" : "Lee",
        "lockhart" : "Covington",
        "locust fork" : "Blount",
        "lookout mountain" : "Etowah",
        "louisville" : "Barbour",
        "lower peachtree" : "Wilcox",
        "lowndesboro" : "Lowndes",
        "loxley" : "Baldwin",
        "luverne" : "Crenshaw",
        "lynn" : "Winston",
        "macedonia" : "Pickens",
        "madison" : "Madison",
        "madrid" : "Houston",
        "magnolia springs" : "Baldwin",
        "majestic" : "Jefferson",
        "malcolm" : "Washington",
        "malvern" : "Geneva",
        "maplesville" : "Chilton",
        "marbury" : "Autauga",
        "margaret" : "St. Clair",
        "marion" : "Perry",
        "marion junction" : "Dallas",
        "marvyn" : "Lee",
        "masseyline" : "Jefferson",
        "maytown" : "Jefferson",
        "mccalla" : "Jefferson",
        "mcdonald chapel" : "Jefferson",
        "mcintosh" : "Washington",
        "mckenzie" : "Butler",
        "mcmullen" : "Pickens",
        "meadowbrook" : "Shelby",
        "megargel" : "Monroe",
        "mellow valley" : "Clay",
        "memphis" : "Pickens",
        "mentone" : "DeKalb",
        "meridianville" : "Madison",
        "midfield" : "Jefferson",
        "midland city" : "Dale",
        "midway" : "Bullock",
        "mignon" : "Talladega",
        "millbrook" : "Elmore",
        "millers ferry" : "Wilcox",
        "millerville" : "Clay",
        "millport" : "Lamar",
        "millry" : "Washington",
        "minor" : "Jefferson",
        "mobile" : "Mobile",
        "mon louis" : "Mobile",
        "monroeville" : "Monroe",
        "montevallo" : "Shelby",
        "montgomery" : "Montgomery",
        "montrose" : "Baldwin",
        "moody" : "St. Clair",
        "moores mill" : "Madison",
        "mooresville" : "Limestone",
        "morgan city" : "Morgan",
        "morris" : "Jefferson",
        "morrison crossroads" : "Randolph",
        "mosses" : "Lowndes",
        "moulton" : "Lawrence",
        "moulton heights" : "Morgan",
        "moundville" : "Hale",
        "mount high" : "Blount",
        "mount hope" : "Lawrence",
        "mount meigs" : "Montgomery",
        "mount olive" : "Coosa",
        //"mount olive" : "Jefferson",
        "mount vernon" : "Mobile",
        "mountain brook" : "Jefferson",
        "mountain creek" : "Chilton",
        "movico" : "Mobile",
        "mulga" : "Jefferson",
        "munford" : "Talladega",
        "muscle shoals" : "Colbert",
        "myrtlewood" : "Marengo",
        "nanafalia" : "Marengo",
        "nances creek" : "Calhoun",
        "napier field" : "Dale",
        "natural bridge" : "Winston",
        "nauvoo" : "Walker",
        "nectar" : "Blount",
        "needham" : "Choctaw",
        "new brockton" : "Coffee",
        "new hope" : "Madison",
        "new market" : "Madison",
        "new site" : "Tallapoosa",
        "new union" : "Etowah",
        "newbern" : "Hale",
        "newell" : "Randolph",
        "newton" : "Dale",
        "newville" : "Henry",
        "normal" : "Madison",
        "north courtland" : "Lawrence",
        "north johns" : "Jefferson",
        "northport" : "Tuscaloosa",
        "notasulga" : "Macon",
        "oak grove" : "Talladega",
        //"oak grove" : "Jefferson",
        "oak hill" : "Wilcox",
        "oakman" : "Walker",
        "oakville" : "Lawrence",
        "odenville" : "St. Clair",
        "ohatchee" : "Calhoun",
        "oneonta" : "Blount",
        "onycha" : "Covington",
        "opelika" : "Lee",
        "opp" : "Covington",
        "orange beach" : "Baldwin",
        "orion" : "Pike",
        "orrville" : "Dallas",
        "our town" : "Tallapoosa",
        "owens cross roads" : "Madison",
        "oxford" : "Calhoun",
        "ozark" : "Dale",
        "paint rock" : "Jackson",
        "palmerdale" : "Jefferson",
        "panola" : "Sumter",
        "parrish" : "Walker",
        "pelham" : "Shelby",
        "pell city" : "St. Clair",
        "pennington" : "Choctaw",
        "penton" : "Chambers",
        "perdido beach" : "Baldwin",
        "perote" : "Bullock",
        "peterman" : "Monroe",
        "peterson" : "Tuscaloosa",
        "petrey" : "Crenshaw",
        "phenix city" : "Russell",
        "phil campbell" : "Franklin",
        "pickensville" : "Pickens",
        "piedmont" : "Calhoun",
        "pike road" : "Montgomery",
        "pinckard" : "Dale",
        "pine apple" : "Wilcox",
        "pine hill" : "Wilcox",
        "pine level" : "Autauga",
        "pine ridge" : "DeKalb",
        "pinson" : "Jefferson",
        "pisgah" : "Jackson",
        "plantersville" : "Dallas",
        "pleasant grove" : "Jefferson",
        "pleasant groves" : "Jackson",
        "point clear" : "Baldwin",
        "pollard" : "Escambia",
        "powell" : "DeKalb",
        "prairieville" : "Hale",
        "prattville" : "Autauga",
        "priceville" : "Morgan",
        "prichard" : "Mobile",
        "providence" : "Marengo",
        "putnam" : "Marengo",
        "quinton" : "Walker",
        "ragland" : "St. Clair",
        "rainbow city" : "Etowah",
        "rainsville" : "DeKalb",
        "ralph" : "Tuscaloosa",
        "ramer" : "Montgomery",
        "ranburne" : "Cleburne",
        "range" : "Conecuh",
        "ray" : "Coosa",
        "red bay" : "Franklin",
        "red hill" : "Blount",
        "red level" : "Covington",
        "redland" : "Elmore",
        "redstone arsenal" : "Madison",
        "reece city" : "Etowah",
        "reeltown" : "Tallapoosa",
        "reform" : "Pickens",
        "rehobeth" : "Houston",
        "remlap" : "Blount",
        "repton" : "Conecuh",
        "ridgeville" : "Etowah",
        "river falls" : "Covington",
        "riverside" : "St. Clair",
        "riverview" : "Escambia",
        "roanoke" : "Randolph",
        "robertsdale" : "Baldwin",
        "rock creek" : "Jefferson",
        "rock mills" : "Randolph",
        "rockford" : "Coosa",
        "rockville" : "Clarke",
        "rogersville" : "Lauderdale",
        "rosa" : "Blount",
        "russellville" : "Franklin",
        "rutledge" : "Crenshaw",
        "safford" : "Dallas",
        "saginaw" : "Shelby",
        "saks" : "Calhoun",
        "salem" : "Lee",
        "samantha" : "Tuscaloosa",
        "samson" : "Geneva",
        "sand rock" : "Cherokee",
        "sanford" : "Covington",
        "saraland" : "Mobile",
        "sardis city" : "Etowah",
        "satsuma" : "Mobile",
        "sawyerville" : "Hale",
        "sayre" : "Jefferson",
        "scottsboro" : "Jackson",
        "seale" : "Russell",
        "section" : "Jackson",
        "selfville" : "Blount",
        "selma" : "Dallas",
        "selmont-west selmont" : "Dallas",
        "seminole" : "Baldwin",
        "semmes" : "Mobile",
        "sheffield" : "Colbert",
        "shelby" : "Shelby",
        "shiloh" : "DeKalb",
        "shoal creek" : "Shelby",
        "shorter" : "Macon",
        "silas" : "Choctaw",
        "silverhill" : "Baldwin",
        "sims chapel" : "Washington",
        "sipsey" : "Walker",
        "skyline" : "Jackson",
        "slocomb" : "Geneva",
        "smiths station" : "Lee",
        "smoke rise" : "Blount",
        "snead" : "Blount",
        "snow hill" : "Wilcox",
        "somerville" : "Morgan",
        "south vinemont" : "Cullman",
        "southside" : "Etowah",
        "spanish fort" : "Baldwin",
        "spring garden" : "Cherokee",
        "spring hill" : "Barbour",
        "spring valley" : "Colbert",
        "springville" : "St. Clair",
        "sprott" : "Perry",
        "spruce pine" : "Franklin",
        "st. clair springs" : "St. Clair",
        "st. florian" : "Lauderdale",
        "st. stephens" : "Washington",
        "standing rock" : "Chambers",
        "stapleton" : "Baldwin",
        "steele" : "St. Clair",
        "sterrett" : "Shelby",
        "stevenson" : "Jackson",
        "stewartville" : "Coosa",
        "stockton" : "Baldwin",
        "straight mountain" : "Blount",
        "sulligent" : "Lamar",
        "sumiton" : "Walker",
        "summerdale" : "Baldwin",
        "summit" : "Blount",
        "susan moore" : "Blount",
        "sweet water" : "Marengo",
        "sylacauga" : "Talladega",
        "sylvan springs" : "Jefferson",
        "sylvania" : "DeKalb",
        "talladega" : "Talladega",
        "talladega springs" : "Talladega",
        "tallassee" : "Elmore",
        "tannehill" : "Tuscaloosa",
        "tanner" : "Limestone",
        "tarrant" : "Jefferson",
        "taylor" : "Houston",
        "tensaw" : "Baldwin",
        "theodore" : "Mobile",
        "thomaston" : "Marengo",
        "thomasville" : "Clarke",
        "thorsby" : "Chilton",
        "tibbie" : "Washington",
        "tidmore bend" : "Etowah",
        "tillmans corner" : "Mobile",
        "town creek" : "Lawrence",
        "toxey" : "Choctaw",
        "trafford" : "Jefferson",
        "triana" : "Madison",
        "trinity" : "Morgan",
        "troy" : "Pike",
        "trussville" : "Jefferson",
        "tuscaloosa" : "Tuscaloosa",
        "tuscumbia" : "Colbert",
        "tuskegee" : "Macon",
        "twin" : "Marion",
        "underwood-petersville" : "Lauderdale",
        "union" : "Greene",
        "union grove" : "Marshall",
        "union springs" : "Bullock",
        "uniontown" : "Perry",
        "uriah" : "Monroe",
        "valhermoso springs" : "Morgan",
        "valley" : "Chambers",
        "valley grande" : "Dallas",
        "valley head" : "DeKalb",
        "vance" : "Tuscaloosa",
        "vandiver" : "Shelby",
        "verbena" : "Chilton",
        "vernon" : "Lamar",
        "vestavia hills" : "Jefferson",
        "village springs" : "Jefferson",
        "vina" : "Franklin",
        "vincent" : "Shelby",
        "vinegar bend" : "Washington",
        "vineland" : "Marengo",
        "vinemont" : "Cullman",
        "vredenburgh" : "Monroe",
        "wadley" : "Randolph",
        "wagarville" : "Washington",
        "waldo" : "Talladega",
        "wallace" : "Escambia",
        "walnut grove" : "Etowah",
        "warrior" : "Jefferson",
        "waterloo" : "Lauderdale",
        "watson" : "Jefferson",
        "waugh" : "Montgomery",
        "waverly" : "Chambers",
        "weaver" : "Calhoun",
        "webb" : "Houston",
        "wedowee" : "Randolph",
        "weogufka" : "Coosa",
        "west blocton" : "Bibb",
        "west end-cobb town" : "Calhoun",
        "west jefferson" : "Jefferson",
        "west point" : "Cullman",
        "westover" : "Shelby",
        "wetumpka" : "Elmore",
        "whatley" : "Clarke",
        "white hall" : "Lowndes",
        "white plains" : "Calhoun",
        "whitesboro" : "Etowah",
        "wilmer" : "Mobile",
        "wilsonville" : "Shelby",
        "wilton" : "Shelby",
        "winfield" : "Marion",
        "winterboro" : "Talladega",
        "woodland" : "Randolph",
        "woodstock" : "Bibb",
        "woodville" : "Jackson",
        "wren" : "Lawrence",
        "yellow bluff" : "Wilcox",
        "yellow pine" : "Washington",
        "york" : "Sumter"
      },
      extractCounty : function (city) {
        var cs = city.split(",")[0].toLowerCase();
        return lib.counties[cs];
      },
      extractVisitDate : function (dataManagementForm) {
        var visitDate = dataManagementForm.accptdt ||
          dataManagementForm.offerdt ||
          dataManagementForm.surgdt ||
          dataManagementForm.mdoncdt ||
          dataManagementForm.radondt ||
          dataManagementForm.plsurdt ||
          dataManagementForm.bmtdt ||
          dataManagementForm.dentdt ||
          dataManagementForm.othdt;
        return new Date(visitDate);
      },
      daysBetweenDates : function (date1, date2){
        var msInDay = 86400000;
        return parseInt(Math.abs(date1-date2)/msInDay, 10);
      },
      treatments : function (doc){
        var treatments = {};
        if(doc.txmedonc === "UAB"){
          treatments.medonc = 1;
        }
        else if(doc.txmedonc === "Elsewhere"){
          treatments.medonc = -1;
        }
        else treatments.medonc = 0;
        if(doc.txradonc === "UAB"){
          treatments.radonc = 1;
        }
        else if(doc.txradonc === "Elsewhere"){
          treatments.radonc = -1;
        }
        else treatments.radonc = 0;
        if(doc.txsurg === "UAB"){
          treatments.surg = 1;
        }
        else if(doc.txsurg === "Elsewhere"){
          treatments.surg = -1;
        }
        else treatments.surg = 0;
        return treatments;
      }
    };
    visitDate = lib.extractVisitDate(doc);
    if (visitDate){
      value = {};

      //Number of visits
      value.visits = 1;

      //Enrollment in clinical trials
      if (doc.cltrial === "Yes" || doc.cltrial === "yes") {
        value.clinical_trial_enrollments = 1;
      } else{
        value.clinical_trial_enrollments = 0;
      }

      //Lag between contact and appointment dates
      if (doc.dtrefer !== null) {
        var referral_to_appointment;
        if (doc.offerdt !== null) {
          referral_to_appointment = lib.daysBetweenDates(new Date(doc.dtrefer), new Date(doc.offerdt));
        } else {
          referral_to_appointment = lib.daysBetweenDates(new Date(doc.dtrefer), visitDate);
        }
        referral_to_appointment = referral_to_appointment > 0 ? referral_to_appointment : null;
        value.referral_to_appointment = referral_to_appointment;
      }

      //Patient Insurance Status
      if(!doc.previns && !doc.appins){
        value.insurance_status = "unknown";
      }
      else if(doc.appins && doc.appins === "Yes"){
        value.insurance_status = "applied for insurance";
      }
      else if(doc.previns && doc.previns === "Yes"){
        value.insurance_status = "previously insured";
      }
      else {
        value.insurance_status = "no insurance";
      }

      //Retention
      value.treatments = {
        txsurg : doc.txsurg,
        txradonc : doc.txradonc,
        txmedonc : doc.txmedonc
      };

      //Clinic
      value.clinic = doc.clinic;

      value.county = lib.extractCounty(doc.ptaddy);

      emit(visitDate.toISOString().slice(0,10), value);
    }
  }
}

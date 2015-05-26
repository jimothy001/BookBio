//SEPARATE YEAR/LANGUAGE AGGREGATE INTO ITS OWN JSON STRUCTURE

(function() {

var WoN = [
{edition:1, year:1776, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "W Strahan , T Cadell", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:2, year:1776, city:"Dublin", iso2:"IE", lt:-6.26719, lg:53.3440, lang:"en", publisher: "Whitestone", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:3, year:1776, city:"Kirkcaldy", iso2:"GB", lt:-3.16667, lg:56.1167, lang:"en", publisher: "manuscript", vol:1, title: "Richesse des Nations"},
{edition:4, year:1776, city:"Leipzig", iso2:"DE", lt:12.3713, lg:51.3396, lang:"de", publisher: "Weidmanns Erben und Reich", vol:2, title: "Untersuchung der Natur und Ursachen von Nationalreich-thumern"},
{edition:5, year:1778, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "W Strahan , T Cadell", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations 2nd Edition"},
{edition:6, year:1778, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "La Haye", vol:4, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:7, year:1778, city:"Basel", iso2:"CH", lt:7.6, lg:47.5667, lang:"fr", publisher: "Jean Jacques Flick", vol:1, title: "Fragment sur les colonies en generale et sure celles Anglois en particulieur"},
{edition:8, year:1778, city:"Lausanne", iso2:"CH", lt:6.63282, lg:46.5160, lang:"fr", publisher: "Societe typographique", vol:1, title: "Fragment sur les colonies en generale et sure celles Anglois en particulieur"},
{edition:9, year:1779, city:"Copenhagen", iso2:"DK", lt:12.5655, lg:55.6759, lang:"da", publisher: "Gyldendals Forlag", vol:2, title: "Undersogelse om National-Velstands Natur og Aarsag"},
{edition:10, year:1779, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Journal de l’agriculture", vol:1, title: "De la nature et les causes de la richesse des Nations#"},
{edition:11, year:1779, city:"Bern", iso2:"CH", lt:7.44744, lg:46.9481, lang:"de", publisher: "Beat Ludwig Walthard", vol:1, title: "Abhandlung uber die colonien uberhaupt und die amerika-nischen besonders"},
{edition:12, year:1781, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "NA", vol:3, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:13, year:1781, city:"Yverdon", iso2:"CH", lt:6.64115, lg:46.7785, lang:"fr", publisher: "FB De Felice", vol:6, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:14, year:1783, city:"Kirkcaldy", iso2:"GB", lt:-3.16667, lg:56.1167, lang:"en", publisher: "manuscript", vol:1, title: "Additions and Corrections to the First and second Editions of Dr Adam Smith#s Inquiry inot the Nature and Causes of the Wealth of Nations"},
{edition:15, year:1784, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "W Strahan , T Cadell", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations 3rd Edition"},
{edition:16, year:1784, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Encyclopedie methodique. Economie politique et diplomatique", vol:1, title: "Extracts from Blavet#s Richesses des Nations"},
{edition:17, year:1785, city:"Dublin", iso2:"IE", lt:-6.26719, lg:53.3440, lang:"en", publisher: "W Colles , R Moncrieffe", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:18, year:1786, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "W Strahan , T Cadell", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations 4th Edition"},
{edition:19, year:1786, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Poincot", vol:6, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:20, year:1788, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Duplain", vol:2, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:21, year:1789, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "W Strahan , T Cadell", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations 5th Edition"},
{edition:22, year:1789, city:"Philadelphia", iso2:"US", lt:-75.1638, lg:39.9523, lang:"en", publisher: "Thomas Dobson", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:23, year:1789, city:"Amsterdam", iso2:"NL", lt:4.88969, lg:52.3740, lang:"nl", publisher: "NA", vol:4, title: "Recherches tres-utiles sur les affaires presentes, et les causes de la richesse des nations"},
{edition:24, year:1790, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Bibliotheque de l#homme publique-Buisson", vol:2, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:25, year:1790, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Buisson", vol:4, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:26, year:1790, city:"Naples", iso2:"IT", lt:14.25, lg:40.8333, lang:"it", publisher: "Presso Giuseppe Policarpo Merande", vol:5, title: "Ricerche sulla natura, e le cagioni della ricchezza delle nazioni"},
{edition:27, year:1791, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "W Strahan , T Cadell", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations 6th Edition"},
{edition:28, year:1791, city:"Avignon", iso2:"FR", lt:4.81667, lg:43.9500, lang:"fr", publisher: "Fortia d#Urban, JJ Niel", vol:4, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:29, year:1791, city:"Basel", iso2:"CH", lt:7.6, lg:47.5667, lang:"en", publisher: "JJ Tourneisen, JL Legrand", vol:4, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:30, year:1792, city:"Neuchatel", iso2:"CH", lt:6.931, lg:46.9918, lang:"fr", publisher: "L Fauche-Borel", vol:2, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:31, year:1792, city:"Leipzig", iso2:"DE", lt:12.3713, lg:51.3396, lang:"de", publisher: "Weidmannischen Buchhandlung", vol:1, title: "Untersuchung der Natur und Ursachen von Nationalreich-thumern"},
{edition:32, year:1792, city:"Madrid", iso2:"ES", lt:-3.70256, lg:40.4165, lang:"es", publisher: "En la Imprenta Real", vol:2, title: "Condorcet, Compendio de la obra inglesa intitulada Riqueza de las Naciones, hecho por el Marques de Condorcet, y traducido al castellano convarias adiciones del original, por Don Carlos Martinez de Irugo"},
{edition:33, year:1793, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "W Strahan , T Cadell", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations 7th Edition"},
{edition:34, year:1793, city:"Dublin", iso2:"IE", lt:-6.26719, lg:53.3440, lang:"en", publisher: "G Burnet, L White", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:35, year:1794, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Buisson", vol:5, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:36, year:1794, city:"Breslau", iso2:"PL", lt:17.0333, lg:51.1000, lang:"de", publisher: "Wilhelm Gottlieb Korn", vol:4, title: "Untersuchung der Natur und Ursachen von Nationalreich-thumern"},
{edition:37, year:1794, city:"Valladolid", iso2:"ES", lt:-4.71667, lg:41.6500, lang:"es", publisher: "En la Oficina de la Viuda e Hijos de Santander", vol:4, title: "Investigacion de la Naturalez y Causas de la Riqueza de las Naciones"},
{edition:38, year:1796, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "W Strahan , T Cadell", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations 8th Edition"},
{edition:39, year:1796, city:"Frankfurt", iso2:"DE", lt:8.68333, lg:50.1167, lang:"de", publisher: "NA", vol:4, title: "Untersuchung der Natur und Ursachen von Nationalreich-thumern"},
{edition:40, year:1796, city:"Amsterdam", iso2:"NL", lt:4.88969, lg:52.3740, lang:"nl", publisher: "NA", vol:2, title: "Naspeuringen over de natuur en oorzaken van den rijkdom der volkeren"},
{edition:41, year:1796, city:"Berlin", iso2:"DE", lt:13.4105, lg:52.5244, lang:"de", publisher: "Johann Friderich Unger", vol:1, title: "Handbuch der Staatswirthschaft zum Gebrauche bey akademischen Vorlesungen, nach Adam Smith#s Grundsatzen ausgearbeitet"},
{edition:42, year:1797, city:"Cambridge", iso2:"GB", lt:0.11667, lg:52.2000, lang:"en", publisher: "Benjamin Flower", vol:1, title: "A Complete Analysis or Abridgement of Dr Adam Smith#s Inquiry into the Nature and Causes of the Wealth of Nations by Jeremiah Joyce"},
{edition:43, year:1799, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "W Strahan , T Cadell", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations 9th Edition"},
{edition:44, year:1799, city:"Breslau", iso2:"PL", lt:17.0333, lg:51.1000, lang:"de", publisher: "Wilhelm Gottlieb Korn", vol:3, title: "Untersuchung der Natur und Ursachen von Nationalreich-thumern 2nd Edition"},
{edition:45, year:1800, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Laran", vol:4, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:46, year:1800, city:"Stockholm", iso2:"SE", lt:18.0649, lg:59.3326, lang:"sv", publisher: "C Deleen o JG Forsgren", vol:1, title: "Undersokning om Kongl. stora sjo- och granse-tullar, samtacciser och sma-tuller med Flera sonsumtions-afgifter"},
{edition:47, year:1800, city:"Berlin", iso2:"DE", lt:13.4105, lg:52.5244, lang:"de", publisher: "Heinrich Frolich", vol:3, title: "Ueber Nationalindustrie und Staatswirthschaft Nach Adam Smithberbeitet"},
{edition:48, year:1800, city:"Stockholm", iso2:"SE", lt:18.0649, lg:59.3326, lang:"sv", publisher: "Kumblinska tryckeriet", vol:1, title: "Handbook for statshusallningen efter Adam Smiths grundsattser"},
{edition:49, year:1801, city:"Dublin", iso2:"IE", lt:-6.26719, lg:53.3440, lang:"en", publisher: "N Kelly", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:50, year:1801, city:"Basil", iso2:"CH", lt:7.6, lg:47.5667, lang:"en", publisher: "James Decker", vol:4, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:51, year:1802, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "W Strahan , T Cadell", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations 10th Edition"},
{edition:52, year:1802, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Agasse", vol:5, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:53, year:1802, city:"St Petersburg", iso2:"RU", lt:30.2642, lg:59.8944, lang:"ru", publisher: "Tipografiia Gosudarstvennoi Meditsinskoi Kollegii", vol:1, title: "Issledovanie svoistva i prichin Bogatstva narodov"},
{edition:54, year:1804, city:"Cambridge", iso2:"GB", lt:0.11667, lg:52.2000, lang:"en", publisher: "Benjamin Flower", vol:1, title: "A Complete Analysis or Abridgement of Dr Adam Smith#s Inquiry into the Nature and Causes of the Wealth of Nations by Jeremiah Joyce"},
{edition:55, year:1804, city:"Hartford", iso2:"US", lt:-72.6851, lg:41.7637, lang:"en", publisher: "Oliver D Cooke", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:56, year:1804, city:"Gothenburg", iso2:"SE", lt:11.9668, lg:57.7072, lang:"sv", publisher: "S Norberg", vol:1, title: "Politisk undersokning om lagar, som hindra och tvinga inforseln af sadana utlandska varor, som kunna alstras eller tillverkas inom landet"},
{edition:57, year:1805, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "W Strahan , T Cadell", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations 11th Edition"},
{edition:58, year:1805, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Greenland and Norris", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:59, year:1805, city:"Glasgow", iso2:"GB", lt:-4.25763, lg:55.8652, lang:"en", publisher: "New Edition R Chapman", vol:4, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:60, year:1805, city:"Glasgow", iso2:"GB", lt:-4.25763, lg:55.8652, lang:"en", publisher: "J and J Scrymgeour", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:61, year:1805, city:"Valladolid", iso2:"ES", lt:-4.71667, lg:41.6500, lang:"es", publisher: "En la Oficina de la Viuda e Hijos de Santander", vol:4, title: "Investigacion de la Naturalez y Causas de la Riqueza de las Naciones 2nd Edition"},
{edition:62, year:1806, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "William Creech", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:63, year:1806, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Arthus Bertrand", vol:5, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:64, year:1806, city:"Gottingen", iso2:"DE", lt:9.93333, lg:51.5333, lang:"de", publisher: "Johann Friedrich Romer", vol:1, title: "Von dem Elementen des National-Reichthums und von der Staatswirthschaft nach Adam Smith"},
{edition:65, year:1808, city:"Konigsberg", iso2:"RU", lt:20.5, lg:54.71, lang:"ru", publisher: "Friedrich Nicolovius", vol:5, title: "Staatswirtschaft ed H von Auerswald"},
{edition:66, year:1809, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Mundell, Doig and Stevenson", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:67, year:1809, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Tegg", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations Containing the Elements of Commerce and Political EConomy by W Enfield"},
{edition:68, year:1810, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Agasse", vol:5, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:69, year:1810, city:"Breslau", iso2:"PL", lt:17.033, lg:51.1000, lang:"de", publisher: "Wilhelm Gottlieb Korn", vol:3, title: "Untersuchung der Natur und Ursachen von Nationalreich-thumern"},
{edition:70, year:1811, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Silvester Doig and Andrew Stirling", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:71, year:1811, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "J Maynard", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:72, year:1811, city:"Hartford", iso2:"US", lt:-72.6851, lg:41.7637, lang:"en", publisher: "William Playfair, Oliver D Cooke", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:73, year:1811, city:"Rio de Janeiro", iso2:"BR", lt:-43.2075, lg:-22.9028, lang:"pt", publisher: "Impressao Regia", vol:3, title: "Compendio de Obra da Riqueza das Nacoes de Adam Smith, traduzida do Original Ingles"},
{edition:74, year:1812, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Cadell and Davies", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:75, year:1812, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "William Baynes", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:76, year:1812, city:"Berlin", iso2:"DE", lt:13.4105, lg:52.5244, lang:"de", publisher: "Gottfr Hayn", vol:1, title: "Die neue Staatseisheit. Oder Auszug aus Adam Smiths  Untersuchung der Natur und Ursachen von Nationalreich-thumern"},
{edition:77, year:1814, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Buchanan, Oliphant, Waugh and Innes", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:78, year:1814, city:"Vienna", iso2:"AT", lt:16.3721, lg:48.2085, lang:"de", publisher: "BP Bauer", vol:3, title: "Untersuchung der Natur und Ursachen von Nationalreich-thumern"},
{edition:79, year:1814, city:"Warsaw", iso2:"PL", lt:21.0118, lg:52.2298, lang:"pl", publisher: "Drukarnia Gazety Warszawskiej", vol:1, title: "Rozprawa o handlu zbozem i o ustawach tyczacych sie handlu tego. Wyjeta z dziela Adama Smitha o naturze i przyczynach bogactwa narodow. ZKsiegi IVtey Rozdzialu Vgo"},
{edition:80, year:1816, city:"Philadelphia", iso2:"US", lt:-75.1638, lg:39.9523, lang:"en", publisher: "D Hanna", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:81, year:1816, city:"Lvov", iso2:"UA", lt:24.0232, lg:49.8383, lang:"sr", publisher: "Karol Wild", vol:1, title: "#Ekonomia polityczna# Pamietnik Lwowski"},
{edition:82, year:1816, city:"Berlin", iso2:"DE", lt:13.4105, lg:52.5244, lang:"de", publisher: "Gottfr Hayn", vol:1, title: "Die neue Staatseisheit. F von Coelln"},
{edition:83, year:1817, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Buchanan, Oliphant, Waugh and Innes", vol:4, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:84, year:1817, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Silvester Doig and Andrew Stirling", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:85, year:1818, city:"Hartford", iso2:"US", lt:-72.6851, lg:41.7637, lang:"en", publisher: "Cook and Hale", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:86, year:1819, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Allason, Maynard", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:87, year:1819, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Stirling and Slade", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:88, year:1821, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "G and WB Whittaker", vol:1, title: "A complete Analysis or Abridgement of Dr Adam Smith#s Inquiry into the Nature and Causes of the Wealth of Nations by Jeremiah Joyce"},
{edition:89, year:1822, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Walker, Akerman, Edwards", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:90, year:1822, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Agasse", vol:6, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:91, year:1826, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "JF Dove", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:92, year:1827, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Thomas Nelson and Peter Brown", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:93, year:1828, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Thomas Nelson and Peter Brown", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:94, year:1828, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Black and Tate", vol:4, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:95, year:1829, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Thomas Nelson and Peter Brown", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:96, year:1831, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Thomas Nelson and Peter Brown", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:97, year:1834, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Thomas Nelson and Peter Brown", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:98, year:1835, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Charles Knight", vol:4, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:99, year:1836, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Thomas Nelson and Peter Brown", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:100, year:1836, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Thomas Nelson and Peter Brown", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:101, year:1837, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Thomas Nelson and Peter Brown", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:102, year:1838, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Adam and Charles Black", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:103, year:1838, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Peter Brown", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:104, year:1839, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Adam and Charles Black", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:105, year:1839, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Ross and Co", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:106, year:1840, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Charles Knight", vol:4, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:107, year:1840, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:108, year:1843, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Charles Knight", vol:4, title: "An Inquiry into the Nature and Causes of the Wealth of Nations, With Notes from Ricardo, McCulloch, Chalmers andother Eminent Political Economists"},
{edition:109, year:1843, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Guillaumin", vol:2, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:110, year:1846, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Adam and Charles Black", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:111, year:1846, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:112, year:1846, city:"Leipzig", iso2:"DE", lt:12.3713, lg:51.3396, lang:"de", publisher: "Otto Wigand", vol:4, title: "Untersuchung der Natur und Ursachen von Nationalreich-thumern"},
{edition:113, year:1847, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:114, year:1848, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:115, year:1848, city:"Aberdeen", iso2:"GB", lt:-2.1, lg:57.1333, lang:"en", publisher: "George Clark and Son", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:116, year:1850, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "JR McCulloch", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:117, year:1851, city:"Turin", iso2:"IT", lt:7.68682, lg:45.0705, lang:"it", publisher: "Pomba", vol:1, title: "Ricerche sopra la natura e le cause della ricchezza della nazioni"},
{edition:118, year:1852, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:119, year:1853, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Adam and Charles Black", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:120, year:1854, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:121, year:1855, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Adam and Charles Black", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:122, year:1857, city:"Hamburg", iso2:"DE", lt:10, lg:53.5500, lang:"de", publisher: "Nolte and Kohler", vol:1, title: "Adam Smith Buch IV Kapitel I"},
{edition:123, year:1859, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Adam and Charles Black", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:124, year:1859, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Guillaumin", vol:3, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:125, year:1860, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:126, year:1861, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Adam and Charles Black", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:127, year:1861, city:"Stuttgart", iso2:"DE", lt:9.17702, lg:48.7823, lang:"de", publisher: "J Engelhorn", vol:2, title: "Ueber die Quellen des Volkswohlstandes"},
{edition:128, year:1863, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:129, year:1863, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Adam and Charles Black", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:130, year:1864, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:131, year:1865, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:132, year:1866, city:"St Petersburg", iso2:"RU", lt:30.2642, lg:59.8944, lang:"ru", publisher: "v tipografii I I Glazunova", vol:3, title: "Issledovanie svoistva i prichin Bogatstva narodov"},
{edition:133, year:1867, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:134, year:1869, city:"Oxford", iso2:"GB", lt:-1.25596, lg:51.7522, lang:"en", publisher: "James E Thorold Rogers", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:135, year:1869, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:136, year:1870, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Alex Murray and Sons", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:137, year:1870, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Adam and Charles Black", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:138, year:1872, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Alex Murray and Sons", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:139, year:1872, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Adam and Charles Black", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:140, year:1872, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Alex Murray and Sons", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:141, year:1873, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Alex Murray and Sons", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:142, year:1874, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Alex Murray and Sons", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:143, year:1875, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Ward, Lock, and Tyler", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:144, year:1877, city:"Oxford", iso2:"GB", lt:-1.25596, lg:51.7522, lang:"en", publisher: "James Thornton", vol:1, title: "An Analysis of Adam Smith#s Inquiry into the Nature and Causes of the Wealth of Nations Pt 1"},
{edition:145, year:1878, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Ward, Lock, and Tyler", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:146, year:1878, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "R Worthington", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:147, year:1878, city:"Berlin", iso2:"DE", lt:13.4105, lg:52.5244, lang:"de", publisher: "Expedition der Merkur", vol:4, title: "Untersuchung der Natur und Ursachen von Nationalreich-thumern"},
{edition:148, year:1879, city:"Berlin", iso2:"DE", lt:13.4105, lg:52.5244, lang:"de", publisher: "E Staude", vol:2, title: "Natur und Ursachen des Volkswohlstandes"},
{edition:149, year:1880, city:"Oxford", iso2:"GB", lt:-1.25596, lg:51.7522, lang:"en", publisher: "Oxford University Press", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:150, year:1880, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "G Routledge and Sons", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:151, year:1880, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Guillaumin", vol:2, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:152, year:1880, city:"Oxford", iso2:"GB", lt:-1.25596, lg:51.7522, lang:"en", publisher: "James Thornton", vol:1, title: "An Analysis of Adam Smith#s An Inquiry into the Nature and Causes of the Wealth of Nations pt2"},
{edition:153, year:1881, city:"Oxford", iso2:"GB", lt:-1.25596, lg:51.7522, lang:"en", publisher: "James Thornton", vol:1, title: "An Abridgment of Adam Smith#s An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:154, year:1882, city:"Berlin", iso2:"DE", lt:13.4105, lg:52.5244, lang:"de", publisher: "E Staude", vol:2, title: "Natur und Ursachen des Volkswohlstandes"},
{edition:155, year:1884, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:156, year:1884, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Keizaigaku Koshukai", vol:3, title: "Fukokuron"},
{edition:157, year:1885, city:"Oxford", iso2:"GB", lt:-1.25596, lg:51.7522, lang:"en", publisher: "A Thomas Shrimpton and Sons", vol:2, title: "Analysis of Adam Smith#s #Wealth of Nations# Book I and II by FA Basford de Wilson"},
{edition:158, year:1885, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Keizaigaku Koshukai", vol:2, title: "Fukokuron Ranyo"},
{edition:159, year:1886, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:160, year:1887, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "George Bell and Sons", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:161, year:1887, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:162, year:1888, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Guillaumin", vol:1, title: "Richesse des Nations"},
{edition:163, year:1889, city:"Oxford", iso2:"GB", lt:-1.25596, lg:51.7522, lang:"en", publisher: "J Vincent", vol:1, title: "The Student#s Edition of the #Wealth of Nations# by AW Roberts"},
{edition:164, year:1889, city:"Edinburgh", iso2:"GB", lt:-3.255, lg:55.9500, lang:"en", publisher: "Adam and Charles Black", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:165, year:1890, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "G Routledge and Sons", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:166, year:1891, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Ward, Lock, and Tyler", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:167, year:1891, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:168, year:1891, city:"Budapest", iso2:"HU", lt:19.0399,lg: 47.498, lang:"ro", publisher: "Pallas irodalmi es nyomdai reszvenytarsasag", vol:4, title: "Vizsgalodas a nemzeti vagyonossag termeszeterol es okairol"},
{edition:169, year:1892, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "G Routledge and Sons", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:170, year:1892, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "George Bell and Sons", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:171, year:1892, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Keizai-zasshi-sha", vol:3, title: "Fukokuron"},
{edition:172, year:1893, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "G Routledge and Sons", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:173, year:1895, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:174, year:1895, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "G Routledge and Sons", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:175, year:1895, city:"Moscow", iso2:"RU", lt:37.6156, lg:55.7522, lang:"ru", publisher: "KT Soldatenkov", vol:1, title: "Issledovanie svoistva i prichin Bogatstva narodov"},
{edition:176, year:1895, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "Macmillan and Co", vol:1, title: "Selected Chapters and Passages from The Wealth of Nations of Adam Smith 1776"},
{edition:177, year:1896, city:"Oxford", iso2:"GB", lt:-1.25596, lg:51.7522, lang:"en", publisher: "A Thomas Shrimpton and Sons", vol:1, title: "An Abstract of Adam Smith#s Wealth of Nations by EL Hawkins"},
{edition:178, year:1898, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "G Routledge and Sons", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:179, year:1899, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "George Bell and Sons", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:180, year:1900, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "G Routledge and Sons", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:181, year:1901, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Thomas Nelson", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:182, year:1901, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "George Bell and Sons", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:183, year:1901, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "PF Collier and Sons", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:184, year:1901, city:"Shanghai", iso2:"CN", lt:121.458, lg:31.2222, lang:"zh", publisher: "Nan-yang College", vol:8, title: "Yuan Fu"},
{edition:185, year:1901, city:"Mumbai", iso2:"IN", lt:72.8479, lg:19.0144, lang:"en", publisher: "Commercial Press", vol:1, title: "An Analysis of Adam Smith#s An Inquiry into the Nature and Causes of the Wealth of Nations Books III-V by SH Hodwala"},
{edition:186, year:1901, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "MW Dunne", vol:1, title: "Essay on Colonies"},
{edition:187, year:1902, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "PF Collier and Sons", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:188, year:1903, city:"Shanghai", iso2:"CN", lt:121.458, lg:31.2222, lang:"zh", publisher: "Commercial Press", vol:8, title: "Yuan Fu"},
{edition:189, year:1903, city:"Edinburgh", iso2:"GB", lt:-3.255, lg:55.9500, lang:"en", publisher: "Oliphant, Anderson and Ferrier", vol:1, title: "Adam Smith#s Wealth of Nations. A New and Condensed Edition"},
{edition:190, year:1903, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "Macmillan and Co", vol:1, title: "Selected Chapters and Passages from The Wealth of Nations of Adam Smith 1776"},
{edition:191, year:1903, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "G Routledge and Sons", vol:1, title: "Free Trade and Protection"},
{edition:192, year:1904, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Methuen and Co", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:193, year:1904, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Grant Richards", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:194, year:1904, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "H Frowde", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:195, year:1904, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "TY Crowell", vol:1, title: "Adam Smith#s Wealth of Nations."},
{edition:196, year:1905, city:"Berlin", iso2:"DE", lt:13.4105, lg:52.5244, lang:"de", publisher: "Robert Prager", vol:1, title: "Untersuchung uber das Wesen und die Ursachen des Volkswohlstandes"},
{edition:197, year:1905, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "Macmillan and Co", vol:1, title: "Selected Chapters and Passages from The Wealth of Nations of Adam Smith 1776"},
{edition:198, year:1905, city:"Oxford", iso2:"GB", lt:-1.25596, lg:51.7522, lang:"en", publisher: "Hubert Giles", vol:1, title: "An Abstract of Adam Smith#s Wealth of Nations by EL Hawkins"},
{edition:199, year:1907, city:"Heidelberg", iso2:"DE", lt:8.69079, lg:49.4077, lang:"en", publisher: "Carl Winter#s Universitatsbuchhandlung", vol:1, title: "Systems of Political Economy"},
{edition:200, year:1908, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "George Bell and Sons", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:201, year:1908, city:"Oxford", iso2:"GB", lt:-1.25596, lg:51.7522, lang:"en", publisher: "Oxford University Press", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:202, year:1908, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Alcan", vol:1, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:203, year:1908, city:"Jena", iso2:"DE", lt:11.5833, lg:50.9333, lang:"de", publisher: "Verlag von Gustav Fischer", vol:3, title: "Eine Untersuchung uber Natur und Wesen des Volkswohlstandes"},
{edition:204, year:1908, city:"St Petersburg", iso2:"RU", lt:30.2642, lg:59.8944, lang:"ru", publisher: "MV Prokopovich", vol:1, title: "Issledovanie svoistva i prichin Bogatstva narodov"},
{edition:205, year:1909, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "PF Collier and Sons", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:206, year:1909, city:"Lund", iso2:"SE", lt:13.1932, lg:55.7058, lang:"sv", publisher: "WK Gleerups Forlag", vol:1, title: "En undersokning av folkens valstand, dess natur och orsaker"},
{edition:207, year:1910, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "JM Den and Sons", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:208, year:1910, city:"Leipzig", iso2:"DE", lt:12.3713, lg:51.3396, lang:"de", publisher: "Alfred Kroner Verlag", vol:2, title: "Der Reichtum der Nationen"},
{edition:209, year:1910, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Nisshindo", vol:1, title: "Fukokuron"},
{edition:210, year:1913, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "G Routledge and Sons", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:211, year:1913, city:"Berlin", iso2:"DE", lt:13.4105, lg:52.5244, lang:"en", publisher: "Walter de Gruyter and Co", vol:1, title: "Adam Smith"},
{edition:212, year:1919, city:"Berlin", iso2:"DE", lt:13.4105, lg:52.5244, lang:"en", publisher: "Walter de Gruyter and Co", vol:1, title: "Adam Smith"},
{edition:213, year:1920, city:"Berlin", iso2:"DE", lt:13.4105, lg:52.5244, lang:"en", publisher: "Walter de Gruyter and Co", vol:1, title: "Adam Smith"},
{edition:214, year:1920, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Methuen and Co", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:215, year:1920, city:"Jena", iso2:"DE", lt:11.5833, lg:50.9333, lang:"de", publisher: "Verlag von Gustav Fischer", vol:2, title: "Eine Untersuchung uber Natur und Wesen des Volkswohlstandes"},
{edition:216, year:1921, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "George Bell and Sons", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:217, year:1921, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Yuhikaku", vol:3, title: "Zenyaku Fukokuron"},
{edition:218, year:1923, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Methuen and Co", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:219, year:1923, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Oxford University Press", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:220, year:1923, city:"Jena", iso2:"DE", lt:11.5833, lg:50.9333, lang:"de", publisher: "Verlag von Gustav Fischer", vol:3, title: "Eine Untersuchung uber Natur und Wesen des Volkswohlstandes"},
{edition:221, year:1923, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Yuhikaku", vol:3, title: "Zenyaku Fukokuron"},
{edition:222, year:1924, city:"Frankfurt", iso2:"DE", lt:8.68333, lg:50.1167, lang:"en", publisher: "M Diesterweg", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:223, year:1924, city:"Leipzig", iso2:"DE", lt:12.3713, lg:51.3396, lang:"de", publisher: "A Kroner", vol:2, title: "Der Reichtum der Nationen"},
{edition:224, year:1924, city:"Berlin", iso2:"DE", lt:13.4105, lg:52.5244, lang:"en", publisher: "Walter de Gruyter and Co", vol:1, title: "Adam Smith"},
{edition:225, year:1924, city:"Petrograd", iso2:"RU", lt:30.2642, lg:59.8944, lang:"ru", publisher: "Izdatel#stvo #priboi#", vol:1, title: "Issledovanie svoistva i prichin Bogatstva narodov"},
{edition:226, year:1925, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Methuen and Co", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:227, year:1925, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Yuhikaku", vol:1, title: "Zenyaku Fukokuron"},
{edition:228, year:1925, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Shincho-sha", vol:1, title: "Fukokuron"},
{edition:229, year:1925, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Shincho-sha", vol:1, title: "Fukokuron"},
{edition:230, year:1926, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "Alfred A Knopf", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:231, year:1926, city:"Bielefeld", iso2:"DE", lt:8.53333, lg:52.0333, lang:"en", publisher: "Velhag and Klasing", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:232, year:1926, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Iwanami Publishing co", vol:1, title: "Kokufuron"},
{edition:233, year:1926, city:"Moscow", iso2:"RU", lt:37.6156, lg:55.7522, lang:"ru", publisher: "Gosudarstvennoe izdatel#stvo", vol:1, title: "Ekonomicheskaia sistema sotsializma v ee razvitii. Burzhuaznye predshestvenniki sotsialisticheskoi ekonomii. Kene, Smit, Rikardo v izbrannukh otryvkakh. Smit A. Issledovanie o prirode i prichinakh"},
{edition:234, year:1927, city:"Turin", iso2:"IT", lt:7.68682, lg:45.0705, lang:"it", publisher: "Unione tipografico-editrice torinese", vol:1, title: "Ricerche sopra la natura e le cause della ricchezza della nazioni"},
{edition:235, year:1927, city:"Milan", iso2:"IT", lt:9.18951, lg:45.4643, lang:"it", publisher: "Istituto Editoriale Italiano La Santa", vol:1, title: "Il Capitale e l#Interesse. Da #La ricchezza delle nazioni#"},
{edition:236, year:1927, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Iwanami Publishing co", vol:1, title: "Kokufuron"},
{edition:237, year:1927, city:"Warsaw", iso2:"PL", lt:21.0118, lg:52.2298, lang:"pl", publisher: "Gebethnera i Wolffa", vol:1, title: "Badania nad natura i przyczynami bogactwa narodow"},
{edition:238, year:1928, city:"Prague", iso2:"CZ", lt:14.4208,lg: 50.088, lang:"cs", publisher: "Laichter", vol:1, title: "Blahobyt narodu. Vybrane kapitoly"},
{edition:239, year:1928, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Shunjasha", vol:2, title: "Kokufuron"},
{edition:240, year:1929, city:"Shanghai", iso2:"CN", lt:121.458, lg:31.2222, lang:"zh", publisher: "Commercial Press", vol:9, title: "Yuan Fu"},
{edition:241, year:1930, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Methuen and Co", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:242, year:1930, city:"Shanghai", iso2:"CN", lt:121.458, lg:31.2222, lang:"zh", publisher: "Commercial Press", vol:3, title: "Yuan Fu"},
{edition:243, year:1931, city:"Shanghai", iso2:"CN", lt:121.458, lg:31.2222, lang:"zh", publisher: "Cathay Guoguang Press", vol:2, title: "Guo Fu Lun"},
{edition:244, year:1930, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Kaizosha", vol:3, title: "Kokufuron"},
{edition:245, year:1931, city:"Moscow", iso2:"RU", lt:37.6156, lg:55.7522, lang:"ru", publisher: "Institut K Marksa i F engel#sa", vol:2, title: "Issledovanie svoistva i prichin Bogatstva narodov"},
{edition:246, year:1933, city:"Helsinki", iso2:"FI", lt:24.9354, lg:60.1695, lang:"fi", publisher: "Werner Soderstrom osakeyhtio", vol:1, title: "Kansojen varallisuus. Tutkimus sen olemuksesta tekijoista"},
{edition:247, year:1933, city:"Leipzig", iso2:"DE", lt:12.3713, lg:51.3396, lang:"de", publisher: "Alfred Kroner Verlag", vol:1, title: "Natur und Ursachen des Volkswohlstandes"},
{edition:248, year:1933, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Shunjasha", vol:4, title: "Kokufuron"},
{edition:249, year:1933, city:"Barcelona", iso2:"ES", lt:2.15899, lg:41.3888, lang:"ca", publisher: "Espana Bancaria, Editorial Bosch", vol:2, title: "Investigacion de la Naturalez y Causas de la Riqueza de las Naciones"},
{edition:250, year:1933, city:"Berlin", iso2:"DE", lt:13.4105, lg:52.5244, lang:"en", publisher: "Walter de Gruyter and Co", vol:1, title: "Adam Smith"},
{edition:251, year:1934, city:"Bielefeld", iso2:"DE", lt:8.53333, lg:52.0333, lang:"en", publisher: "Rengersche Buchhandlung", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:252, year:1934, city:"Bucharest", iso2:"RO", lt:26.1063, lg:44.4323, lang:"ro", publisher: "Editura Bucovina", vol:4, title: "Avutia Natiunilor"},
{edition:253, year:1935, city:"Athens", iso2:"GR", lt:23.7162, lg:37.9795, lang:"en", publisher: "Vassileiou", vol:1, title: "O Ploutos ton ethnon"},
{edition:254, year:1935, city:"Moscow", iso2:"RU", lt:37.6156, lg:55.7522, lang:"ru", publisher: "Gosudarstvennoe sotsial#no-ekonomicheskoe izdatel#stvo", vol:2, title: "Issledovanie svoistva i prichin Bogatstva narodov"},
{edition:255, year:1936, city:"Shanghai", iso2:"CN", lt:121.458, lg:31.2222, lang:"zh", publisher: "Zhonghua Book Store", vol:2, title: "Guo Fu Lun"},
{edition:256, year:1936, city:"Lisbon", iso2:"PT", lt:-9.13333, lg:38.7167, lang:"pt", publisher: "Instituto Superior de Ciencias Economicas e Financeiras", vol:1, title: "Adam Smith, Fundador de Economia Politica by Antonio Lino Neto"},
{edition:257, year:1937, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "Random House", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:258, year:1937, city:"Nashville", iso2:"US", lt:-86.7844, lg:36.1659, lang:"en", publisher: "Parthenon Press", vol:1, title: "The Synthetic Wealth of Nations"},
{edition:259, year:1940, city:"Ann Arbor", iso2:"US", lt:-83.7409, lg:42.2776, lang:"en", publisher: "JW Edwards", vol:1, title: "the Wealth of Nations"},
{edition:260, year:1940, city:"Budapest", iso2:"HU", lt:19.0399, lg:47.4980, lang:"ro", publisher: "Magyar Kozgazdasagi Tarsasag", vol:2, title: "Vizsgalodas a nemzeti vagyonossag termeszeterol es okairol"},
{edition:261, year:1940, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Iwanami Publishing co", vol:5, title: "Kokufuron"},
{edition:262, year:1940, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"en", publisher: "Dobunkan", vol:1, title: "Selected Chapters and Passages from The Wealth of Nations of Adam Smith"},
{edition:263, year:1942, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"en", publisher: "E Cannan", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:264, year:1945, city:"Turin", iso2:"IT", lt:7.68682, lg:45.0705, lang:"it", publisher: "Unione tipografico-editrice torinese", vol:1, title: "Ricerche sulla natura, e le cagioni della ricchezza delle nazioni"},
{edition:265, year:1946, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "NA", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:266, year:1946, city:"Frankfurt", iso2:"DE", lt:8.68333, lg:50.1167, lang:"de", publisher: "Vittorio Klostermann", vol:1, title: "Die Theorie des Aussenhandels. Inquiry into the nature and causes of the Wealth of nations B IV ch 1 through 3 1776"},
{edition:267, year:1946, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"en", publisher: "Dobunkan", vol:1, title: "Selected Chapters and Passages from The Wealth of Nations of Adam Smith"},
{edition:268, year:1947, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Kaizosha", vol:6, title: "Kokufuron"},
{edition:269, year:1947, city:"Barcelona", iso2:"ES", lt:2.15899, lg:41.3888, lang:"ca", publisher: "Espana Bancaria, Editorial Bosch", vol:3, title: "Investigacion de la Naturalez y Causas de la Riqueza de las Naciones"},
{edition:270, year:1948, city:"Chicago", iso2:"US", lt:-87.65, lg:41.8500, lang:"en", publisher: "Henry Regnery Co", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:271, year:1948, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "RR Smith", vol:1, title: "Adam Smith Today, An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:272, year:1948, city:"Athens", iso2:"GR", lt:23.7162, lg:37.9795, lang:"el", publisher: "Estia", vol:1, title: "Ereynai pri tis fyseos n ton aition toy ploytoy ton ethnon"},
{edition:273, year:1948, city:"Turin", iso2:"IT", lt:7.68682, lg:45.0705, lang:"it", publisher: "Unione tipografico-editrice torinese", vol:1, title: "Ricerche sulla natura, e le cagioni della ricchezza delle nazioni"},
{edition:274, year:1948, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Nikko-shoin", vol:2, title: "Dotoku-josu-ron"},
{edition:275, year:1948, city:"Istanbul", iso2:"TR", lt:30.5522, lg:37.7644, lang:"tr", publisher: "MEB", vol:2, title: "Milletlerin Zenginligi"},
{edition:276, year:1948, city:"Osaka", iso2:"JP", lt:138.045, lg:36.0566, lang:"ja", publisher: "Sogensha", vol:1, title: "Kokufuron no soko sonota"},
{edition:277, year:1948, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Nihonhyoron-sha", vol:1, title: "Kokufuron-soko"},
{edition:278, year:1949, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Shunjasha", vol:1, title: "Kokufuron"},
{edition:279, year:1949, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Kenshini-sha", vol:1, title: "Kokufuron"},
{edition:280, year:1949, city:"Brunswick", iso2:"DE", lt:10.5333, lg:52.2667, lang:"de", publisher: "George Westermann Verlag", vol:1, title: "Untersuchung der Natur und Ursprung des Volkswohlstands"},
{edition:281, year:1950, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Methuen and Co", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:282, year:1950, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Alfred Costes", vol:1, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:283, year:1950, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Dalloz", vol:1, title: "Adam Smith, textes choisis"},
{edition:284, year:1952, city:"Chicago", iso2:"US", lt:-87.65, lg:41.8500, lang:"en", publisher: "Encyclopedia Britannica", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:285, year:1952, city:"Philadelphia", iso2:"US", lt:-75.1638, lg:39.9523, lang:"en", publisher: "Franklin Library", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:286, year:1952, city:"Belgrade", iso2:"RS", lt:20.4651, lg:44.8040, lang:"ru", publisher: "Kultura", vol:2, title: "Istrazivanoe Prirode I Uzraoka Bogatstua Naroda"},
{edition:287, year:1953, city:"Chicago", iso2:"US", lt:-87.65, lg:41.8500, lang:"en", publisher: "H Regnery", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:288, year:1954, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Shisei-shoin", vol:2, title: "Dotoku-josu-ron"},
{edition:289, year:1954, city:"Warsaw", iso2:"PL", lt:21.0118, lg:52.2298, lang:"pl", publisher: "Panstwowe Wydawnictwo Naukowe", vol:2, title: "Badania nad natura i przyczynami bogactwa narodow"},
{edition:290, year:1955, city:"Ragusa", iso2:"IT", lt:14.7172, lg:36.9282, lang:"it", publisher: "Tipografia Studio Tiopgrafico", vol:1, title: "Feudatario e Mercante"},
{edition:291, year:1955, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"en", publisher: "Dobunkan", vol:2, title: "Selected Chapters and Passages from The Wealth of Nations of Adam Smith"},
{edition:292, year:1955, city:"Instabul", iso2:"TR", lt:30.5522, lg:37.7644, lang:"tr", publisher: "MEB", vol:2, title: "Milletlerin Zenginligi"},
{edition:293, year:1956, city:"Madrid", iso2:"ES", lt:-3.70256, lg:40.4165, lang:"es", publisher: "Editorial Aguilar", vol:1, title: "Investigacion de la Naturalez y Causas de la Riqueza de las Naciones"},
{edition:294, year:1957, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "Appleton, Century, Crofts", vol:1, title: "Selections from The Wealth of Nations"},
{edition:295, year:1957, city:"Seoul", iso2:"KR", lt:126.978, lg:37.5683, lang:"ko", publisher: "Jeong-yeon-sa Press", vol:1, title: "Gukburon"},
{edition:296, year:1957, city:"Seoul", iso2:"KR", lt:126.978, lg:37.5683, lang:"ko", publisher: "Chunjosa", vol:3, title: "Gukburon"},
{edition:297, year:1958, city:"Prague", iso2:"CZ", lt:14.4208, lg:50.0880, lang:"cs", publisher: "State Publishing House for Political Literature", vol:2, title: "Pojednani o podstate a puvodu bohatstvi narodu"},
{edition:298, year:1958, city:"Mexico City", iso2:"MX", lt:-99.1277, lg:19.4285, lang:"es", publisher: "Fondo de Cultura Economica", vol:1, title: "Investigacion de la Naturalez y Causas de la Riqueza de las Naciones"},
{edition:299, year:1959, city:"Budapest", iso2:"HU", lt:19.0399, lg:47.4980, lang:"ro", publisher: "Akademiai Kiado", vol:1, title: "A nemzetek gazdagsaga"},
{edition:300, year:1959, city:"Cairo", iso2:"EG", lt:31.2497, lg:30.0626, lang:"ar", publisher: "Daral-gahira li-tiba", vol:1, title: "Tharwat al-umam"},
{edition:301, year:1959, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Keiyu-sha", vol:5, title: "Kokufuron"},
{edition:302, year:1959, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Iwanami Publishing co", vol:5, title: "Kokufuron"},
{edition:303, year:1959, city:"Milan", iso2:"IT", lt:9.18951, lg:45.4643, lang:"it", publisher: "SE", vol:1, title: "La ricchezza delle nazioni "},
{edition:304, year:1960, city:"Seoul", iso2:"KR", lt:126.978, lg:37.5683, lang:"ko", publisher: "Jeong-yeon-sa Press", vol:1, title: "Gukburon"},
{edition:305, year:1961, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Methuen and Co", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:306, year:1961, city:"Indianapolis", iso2:"US", lt:-86.158, lg:39.7684, lang:"en", publisher: "Bobbs-Merill", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations, representative selections"},
{edition:307, year:1961, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Kawade-shobo-shinsha", vol:1, title: "Kokufuron"},
{edition:308, year:1961, city:"Madrid", iso2:"ES", lt:-3.70256, lg:40.4165, lang:"es", publisher: "Editorial Aguilar", vol:2, title: "Indagacion Acerca de la Naturaleza y Causas de la Riqueza de Las Naciones"},
{edition:309, year:1962, city:"Bucharest", iso2:"RO", lt:26.1063, lg:44.4323, lang:"ro", publisher: "Editura Academiei Republicii Populare Romane", vol:2, title: "Avutia Natiunilor"},
{edition:310, year:1962, city:"Moscow", iso2:"RU", lt:37.6156, lg:55.7522, lang:"ru", publisher: "Izdatel#stvo  sotsial#no-ekonomicheskoi literatury", vol:1, title: "Issledovanie svoistva i prichin Bogatstva narodov"},
{edition:311, year:1963, city:"Chicago", iso2:"US", lt:-87.65, lg:41.8500, lang:"en", publisher: "RD Irwin", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:312, year:1963, city:"Berlin", iso2:"DE", lt:13.4105, lg:52.5244, lang:"de", publisher: "Akademie Verlag", vol:3, title: "Untersuchung der Natur und Ursachen des Reichtums der Nationen"},
{edition:313, year:1963, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Kawade-shobo-shinsha", vol:1, title: "Kokufuron"},
{edition:314, year:1964, city:"Taipei", iso2:"TW", lt:121.532, lg:25.0478, lang:"zh", publisher: "Bank of Taiwan", vol:2, title: "Guo Fu Lun"},
{edition:315, year:1964, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Kawade-shobo-shinsha", vol:1, title: "Kokufuron"},
{edition:316, year:1965, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Kawade-shobo-shinsha", vol:2, title: "Kokufuron"},
{edition:317, year:1966, city:"New Rochelle", iso2:"US", lt:-73.7823, lg:40.9115, lang:"en", publisher: "Arlington House", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:318, year:1966, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "AM Kelley", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:319, year:1966, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "AM Kelley", vol:1, title: "Observations on the Subjects Treated of In Dr Smith#s Inquiry into the Nature and Causes of the Wealth of Nations by David Buchanan"},
{edition:320, year:1966, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Meiji-tosho", vol:1, title: "Kyoikuron"},
{edition:321, year:1968, city:"Seoul", iso2:"KR", lt:126.978, lg:37.5683, lang:"ko", publisher: "Jeong-yeon-sa Press", vol:1, title: "Gukburon"},
{edition:322, year:1969, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "University of Tokyo Press", vol:3, title: "Kokufuron"},
{edition:323, year:1969, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Iwanami Publishing co", vol:2, title: "Shokokumin no tomi"},
{edition:324, year:1969, city:"Rome", iso2:"IT", lt:12.4839, lg:41.8947, lang:"it", publisher: "Editori riuniti", vol:1, title: "La ricchezza delle nazioni "},
{edition:325, year:1970, city:"Harmondsworth", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Penguin Books", vol:1, title: "The Wealth of Nations"},
{edition:326, year:1970, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "Viking Penguin", vol:1, title: "the Wealth of Nations"},
{edition:327, year:1970, city:"Belgrade", iso2:"RS", lt:20.4651, lg:44.8040, lang:"ru", publisher: "Kultura", vol:3, title: "Istrazivanoe Prirode I Uzraoka Bogatstua Naroda"},
{edition:328, year:1970, city:"Seoul", iso2:"KR", lt:126.978, lg:37.5683, lang:"ko", publisher: "Eul-yoo Publishing Co", vol:2, title: "Gukburon"},
{edition:329, year:1971, city:"Copenhagen", iso2:"DK", lt:12.5655, lg:55.6759, lang:"da", publisher: "Rhodos Teorihistoriske skrifter", vol:1, title: "En undersokning av folkens valstand, dess natur och orsaker"},
{edition:330, year:1971, city:"Seoul", iso2:"KR", lt:126.978, lg:37.5683, lang:"ko", publisher: "Chunjosa", vol:1, title: "Gukburon"},
{edition:331, year:1971, city:"Puerto Rico", iso2:"PR", lt:-66.1057, lg:18.4663, lang:"es", publisher: "Universidad de Puerto Rico", vol:1, title: "La Riqueza de las Naciones"},
{edition:332, year:1972, city:"Beijing", iso2:"CN", lt:116.397, lg:39.9075, lang:"zh", publisher: "Commercial Press", vol:2, title: "Guo Fu Lun"},
{edition:333, year:1972, city:"Seoul", iso2:"KR", lt:126.978, lg:37.5683, lang:"ko", publisher: "Daeyang Seojeok", vol:1, title: "Gukburon"},
{edition:334, year:1973, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Chikuma-Shobo", vol:1, title: "Dotoku-Kanjo-ron"},
{edition:335, year:1973, city:"Milan", iso2:"IT", lt:9.18951, lg:45.4643, lang:"it", publisher: "Istituto Editoriale Internazionale", vol:1, title: "Indagine sulla natura e le cause della ricchezza delle nazioni"},
{edition:336, year:1974, city:"Harmondsworth", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Penguin Books", vol:1, title: "The Wealth of Nations"},
{edition:337, year:1974, city:"Munich", iso2:"DE", lt:7.4, lg:50.9167, lang:"de", publisher: "Verlag CH Beck", vol:1, title: "Der Wohlstand der Nationen. Eine Untersuchung seiner Natur und seiner Ursachen"},
{edition:338, year:1974, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Kawade-shobo-shinsha", vol:2, title: "Kokufuron"},
{edition:339, year:1975, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "EP Dutton and Co", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:340, year:1975, city:"Turin", iso2:"IT", lt:7.68682, lg:45.0705, lang:"it", publisher: "Unione tipografico-editrice torinese1", vol:1, title: "La ricchezza delle nazioni "},
{edition:341, year:1976, city:"Oxford", iso2:"GB", lt:-1.25596, lg:51.7522, lang:"en", publisher: "Oxford University Press", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:342, year:1976, city:"Chicago", iso2:"US", lt:-87.65, lg:41.8500, lang:"en", publisher: "University of Chicago Press", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:343, year:1976, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Gallimard", vol:1, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:344, year:1976, city:"Rome", iso2:"IT", lt:12.4839, lg:41.8947, lang:"it", publisher: "Newton Compton", vol:3, title: "La ricchezza delle nazioni."},
{edition:345, year:1976, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Chuokoronsha", vol:3, title: "Kokufuron"},
{edition:346, year:1976, city:"Seoul", iso2:"KR", lt:126.978, lg:37.5683, lang:"ko", publisher: "Dongshu Publishing Co", vol:2, title: "Gukburon"},
{edition:347, year:1977, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "EP Dutton and Co", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:348, year:1977, city:"Milan", iso2:"IT", lt:9.18951, lg:45.4643, lang:"it", publisher: "Arnoldo Mondadori", vol:2, title: "Indagine sulla natura e le cause della ricchezza delle nazioni"},
{edition:349, year:1977, city:"Taipei", iso2:"TW", lt:121.532, lg:25.0478, lang:"zh", publisher: "Taiwan Commercial Press", vol:3, title: "Yuan Fu"},
{edition:350, year:1978, city:"Philadelphia", iso2:"US", lt:-75.1638, lg:39.9523, lang:"en", publisher: "Franklin Library", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:351, year:1978, city:"Tehran", iso2:"IR", lt:51.4215, lg:35.6944, lang:"fa", publisher: "Payam", vol:1, title: "Servat-e Melal"},
{edition:352, year:1978, city:"Munich", iso2:"DE", lt:7.4, lg:50.9167, lang:"de", publisher: "Deutscher Taschen buch Verlag", vol:1, title: "Der Wohlstand der Nationen."},
{edition:353, year:1978, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Kazuo Okochi", vol:3, title: "Kokufuron"},
{edition:354, year:1978, city:"Seoul", iso2:"KR", lt:126.978, lg:37.5683, lang:"ko", publisher: "Daeyang Seojeok", vol:1, title: "Gukburon"},
{edition:355, year:1978, city:"Rio de Janeiro", iso2:"BR", lt:-43.2075, lg:-22.9028, lang:"pt", publisher: "Francisco Chaves Fernandes", vol:1, title: "A Economia Classica. Textos"},
{edition:356, year:1979, city:"Harmondsworth", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Penguin Books", vol:1, title: "The Wealth of Nations"},
{edition:357, year:1979, city:"Tehran", iso2:"IR", lt:51.4215, lg:35.6944, lang:"fa", publisher: "Jibi", vol:1, title: "Adam Smith Va Servat-e Melal"},
{edition:358, year:1980, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Chuokoronsha", vol:1, title: "Kokufuron"},
{edition:359, year:1980, city:"Sao Paulo", iso2:"BR", lt:-46.6361, lg:-23.5475, lang:"pt", publisher: "Global Editora", vol:1, title: "A Riqueza das Nacoes"},
{edition:360, year:1981, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Chikura Shobo", vol:3, title: "Kokufuron"},
{edition:361, year:1981, city:"Lisbon", iso2:"PT", lt:-9.13333, lg:38.7167, lang:"pt", publisher: "Fundacao Calouste Gulbenkian", vol:2, title: "Inqerito sobra a Natureza e as Causas da Riqueza das Nacoes"},
{edition:362, year:1981, city:"Beijing", iso2:"CN", lt:116.397, lg:39.9075, lang:"zh", publisher: "Commercial Press", vol:2, title: "Yuan Fu"},
{edition:363, year:1982, city:"Indianapolis", iso2:"US", lt:-86.158, lg:39.7684, lang:"en", publisher: "Liberty Press", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:364, year:1982, city:"Harmondsworth", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Penguin Books", vol:1, title: "The Wealth of Nations"},
{edition:365, year:1982, city:"Seoul", iso2:"KR", lt:126.978, lg:37.5683, lang:"ko", publisher: "Beom Han Publishing Company", vol:1, title: "Gukburon"},
{edition:366, year:1983, city:"Seoul", iso2:"KR", lt:126.978, lg:37.5683, lang:"ko", publisher: "Eul-yoo Publishing Co", vol:2, title: "Gukburon"},
{edition:367, year:1983, city:"Seoul", iso2:"KR", lt:126.978, lg:37.5683, lang:"ko", publisher: "Hak Won Publishing Co", vol:2, title: "Gukburon"},
{edition:368, year:1983, city:"Sao Paulo", iso2:"BR", lt:-46.6361, lg:-23.5475, lang:"pt", publisher: "Abril Cultural", vol:2, title: "A riqueza das Nacoes. Investigacao sobre sua Natureza e suas Causas"},
{edition:369, year:1985, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "Random House", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:370, year:1985, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "Macmillan and Co", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:371, year:1985, city:"Athens", iso2:"GR", lt:23.7162, lg:37.9795, lang:"el", publisher: "Papazisis", vol:1, title: "H ekeseliksi tis oikonomikis skepseos apo toys archaioys ellines stoys klasikoys"},
{edition:372, year:1985, city:"Ankara", iso2:"TK", lt:-171.852, lg:-9.19768, lang:"tr", publisher: "Alan Publishers", vol:1, title: "Uluslarin Zenginligi"},
{edition:373, year:1986, city:"Dusseldorf", iso2:"DE", lt:6.77616, lg:51.2217, lang:"de", publisher: "Verlag Wirtschaft und Finanzen", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:374, year:1986, city:"Harmondsworth", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Penguin Books", vol:1, title: "The Wealth of Nations"},
{edition:375, year:1988, city:"Barcelona", iso2:"ES", lt:2.15899, lg:41.3888, lang:"ca", publisher: "oikostau sa", vol:2, title: "Investigacion sobre la Naturaleza y Causas de la Riqueza de las Naciones"},
{edition:376, year:1990, city:"Chicago", iso2:"US", lt:-87.65, lg:41.8500, lang:"en", publisher: "Encyclopedia Britannica", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:377, year:1990, city:"Milan", iso2:"IT", lt:9.18951, lg:45.4643, lang:"it", publisher: "SE", vol:1, title: "La ricchezza delle nazioni "},
{edition:378, year:1991, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Everyman#s Library", vol:1, title: "The Wealth of Nations"},
{edition:379, year:1991, city:"Buffalo", iso2:"US", lt:-78.8784, lg:42.8865, lang:"en", publisher: "Prometheus Books", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:380, year:1991, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Flammarion", vol:2, title: "Recherches sure la nature et les causes de la richesse des nations"},
{edition:381, year:1991, city:"Athens", iso2:"GR", lt:23.7162, lg:37.9795, lang:"el", publisher: "Euroekdotiki", vol:1, title: "Erevna gia ti fysi kai ta aitia toy ploutou ton ethnon"},
{edition:382, year:1991, city:"Barcelona", iso2:"ES", lt:2.15899, lg:41.3888, lang:"ca", publisher: "Edicions 62", vol:2, title: "Indagacion sobre la naturalesa i les causes de la riqueza de les nacions"},
{edition:383, year:1991, city:"Rome", iso2:"IT", lt:12.4839, lg:41.8947, lang:"it", publisher: "Editori riuniti", vol:1, title: "La ricchezza delle nazioni "},
{edition:384, year:1991, city:"Moscow", iso2:"RU", lt:37.6156, lg:55.7522, lang:"ru", publisher: "Ekonov", vol:1, title: "Issledovanie svoistva i prichin Bogatstva naroda. Otdel#nye glavy"},
{edition:385, year:1992, city:"Budapest", iso2:"HU", lt:19.0399, lg:47.4980, lang:"ro", publisher: "Kozgazdasagi es Jogi Konyvkiado", vol:1, title: "Nemzetek gazdagsaga"},
{edition:386, year:1992, city:"Seoul", iso2:"KR", lt:126.978, lg:37.5683, lang:"ko", publisher: "Bumwoosa", vol:2, title: "Gukburon"},
{edition:387, year:1992, city:"Seoul", iso2:"KR", lt:126.978, lg:37.5683, lang:"ko", publisher: "Dong-a Chulpansa", vol:2, title: "Gukburon"},
{edition:388, year:1992, city:"Chisinau", iso2:"MD", lt:28.8575, lg:47.0056, lang:"ro", publisher: "Universitas", vol:2, title: "Avutia Natiunilor"},
{edition:389, year:1993, city:"Indianapolis", iso2:"US", lt:-86.158, lg:39.7684, lang:"en", publisher: "Hackett Publishing Co", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:390, year:1993, city:"Oxford", iso2:"GB", lt:-1.25596, lg:51.7522, lang:"en", publisher: "Oxford University Press", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations. A Selected Edition"},
{edition:391, year:1993, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Yushodo", vol:3, title: "Fukokuron"},
{edition:392, year:1993, city:"Moscow", iso2:"RU", lt:37.6156, lg:55.7522, lang:"ru", publisher: "Izdatel#stvo Nauka", vol:1, title: "Issledovanie svoistva i prichin Bogatstva narodov"},
{edition:393, year:1993, city:"Moscow", iso2:"RU", lt:37.6156, lg:55.7522, lang:"ru", publisher: "Izdatel#stvo Nauka", vol:1, title: "Issledovanie svoistva i prichin Bogatstva narodov"},
{edition:394, year:1993, city:"Petrozavodsk", iso2:"RU", lt:34.3469, lg:61.7849, lang:"ru", publisher: "Petrocom", vol:1, title: "Issledovanie svoistva i prichin Bogatstva narodov"},
{edition:395, year:1994, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "Classics of Liberty", vol:2, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:396, year:1994, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "Modern Library", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:397, year:1994, city:"Madrid", iso2:"ES", lt:-3.70256, lg:40.4165, lang:"es", publisher: "Alianza Editorial", vol:1, title: "La Riqueza de las Naciones"},
{edition:398, year:1994, city:"Gothenburg", iso2:"SE", lt:11.9668, lg:57.7072, lang:"sv", publisher: "Ratio", vol:1, title: "Den osynliga handen"},
{edition:399, year:1995, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Pickering and Chatto", vol:3, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:400, year:1995, city:"Edinburgh", iso2:"GB", lt:-3.2, lg:55.9500, lang:"en", publisher: "Akros Publications", vol:1, title: "Adam Smith From the Wealth of Nations"},
{edition:401, year:1995, city:"Paris", iso2:"FR", lt:2.3488, lg:48.8534, lang:"fr", publisher: "Presses universitaires de France", vol:4, title: "Enquete sur la nature et les causes de la richesse des nations"},
{edition:402, year:1995, city:"Rome", iso2:"IT", lt:12.4839, lg:41.8947, lang:"it", publisher: "Newton Compton", vol:1, title: "La ricchezza delle nazioni "},
{edition:403, year:1996, city:"Jerusalem", iso2:"IL", lt:35.2253, lg:31.7790, lang:"he", publisher: "Bialik Institute", vol:3, title: "The Wealth of Nations"},
{edition:404, year:1996, city:"Castilla y Leon", iso2:"ES", lt:-2.92528, lg:43.2627, lang:"es", publisher: "Junta de Castilla y Leon", vol:4, title: "Investigacion de la Naturalez y Causas de la Riqueza de las Naciones"},
{edition:405, year:1996, city:"Madrid", iso2:"ES", lt:-3.70256, lg:40.4165, lang:"es", publisher: "Ediciones Piranide", vol:1, title: "La Riqueza de las Naciones"},
{edition:406, year:1997, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Penguin Books", vol:1, title: "The Wealth of Nations"},
{edition:407, year:1997, city:"Reykjavik", iso2:"IS", lt:-21.8954, lg:64.1355, lang:"is", publisher: "Bokafelagio", vol:1, title: "Rannsokn a edli og orsokum audlegdar pjodanna"},
{edition:408, year:1997, city:"Rome", iso2:"IT", lt:12.4839, lg:41.8947, lang:"it", publisher: "Editori riuniti", vol:1, title: "La ricchezza delle nazioni "},
{edition:409, year:1997, city:"Moscow", iso2:"RU", lt:37.6156, lg:55.7522, lang:"ru", publisher: "OS 89", vol:1, title: "Issledovanie svoistva i prichin Bogatstva narodov"},
{edition:410, year:1998, city:"Washington", iso2:"US", lt:-77.0364, lg:38.8951, lang:"en", publisher: "Regnery Publishers", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:411, year:1998, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Parma Books", vol:1, title: "Adam Smith"},
{edition:412, year:1998, city:"Novi Sad", iso2:"RS", lt:19.8369, lg:45.2517, lang:"hu", publisher: "Global Books", vol:1, title: "Istrazivanoe Prirode I Uzraoka Bogatstua Naroda"},
{edition:413, year:1999, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Penguin Books", vol:1, title: "The Wealth of Nations"},
{edition:414, year:1999, city:"London", iso2:"GB", lt:-0.12883, lg:51.5005, lang:"en", publisher: "Penguin Books", vol:2, title: "The Wealth of Nations Books IV-V"},
{edition:415, year:1999, city:"Dusseldorf", iso2:"DE", lt:6.77616, lg:51.2217, lang:"de", publisher: "Verlag Wirtschaft und Finanzen", vol:2, title: "Untersuchung uber Wesen und Ursachen des Reichtums der Volker"},
{edition:416, year:1999, city:"Bristol", iso2:"GB", lt:-2.58333, lg:51.4500, lang:"en", publisher: "Thoemmes Press", vol:1, title: "Handbuch der Staatswirthschaft zum Gebrauche bey akademischen Vorlesungen, nach Adam Smith#s Grundsatzen ausgearbeitet by Georg Sartorius"},
{edition:417, year:1999, city:"Bristol", iso2:"GB", lt:-2.58333, lg:51.4500, lang:"en", publisher: "Thoemmes Press", vol:3, title: "Uber Nationalindustrie und Staatswirthschaft by AF Lueder"},
{edition:418, year:1999, city:"Athens", iso2:"GR", lt:23.7162, lg:37.9795, lang:"el", publisher: "Papazisis", vol:1, title: "Erevna gia ti fysi kai ta aitia toy ploutou ton ethnon"},
{edition:419, year:2000, city:"New York", iso2:"US", lt:-74.006, lg:40.7143, lang:"en", publisher: "Modern Library", vol:1, title: "An Inquiry into the Nature and Causes of the Wealth of Nations"},
{edition:420, year:2000, city:"Taipei", iso2:"TW", lt:121.532, lg:25.0478, lang:"zh", publisher: "Taiwan Zianjue Publishing Press", vol:1, title: "Guo Fu Lun"},
{edition:421, year:2000, city:"Athens", iso2:"GR", lt:23.7162, lg:37.9795, lang:"el", publisher: "Ellinika Grammata", vol:1, title: "Erevna gia ti fysi kai ta aitia toy ploutou ton ethnon"},
{edition:422, year:2000, city:"Tokyo", iso2:"JP", lt:139.581, lg:35.6149, lang:"ja", publisher: "Iwanami Publishing co", vol:4, title: "Kokufuron"},
{edition:423, year:2001, city:"Shanghai", iso2:"CN", lt:121.458, lg:31.2222, lang:"zh", publisher: "ShanXi People#s Press", vol:1, title: "Guo Fu Lun"},
];

module.exports.getWoN = function(){
	return WoN;
}

}());

(function() {

var YrLng = [
{year:1776, ja:0,en:1,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:0,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:0,hu:0,es:0,da:0,},
{year:1776, ja:0,en:2,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:0,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:0,hu:0,es:0,da:0,},
{year:1776, ja:0,en:3,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:0,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:0,hu:0,es:0,da:0,},
{year:1776, ja:0,en:3,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:0,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:1,hu:0,es:0,da:0,},

{year:1778, ja:0,en:4,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:0,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:1,hu:0,es:0,da:0,},
{year:1778, ja:0,en:4,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:1,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:1,hu:0,es:0,da:0,},
{year:1778, ja:0,en:4,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:2,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:1,hu:0,es:0,da:0,},
{year:1778, ja:0,en:4,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:3,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:1,hu:0,es:0,da:0,},

{year:1779, ja:0,en:4,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:3,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:1,hu:0,es:0,da:1,},
{year:1779, ja:0,en:4,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:4,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:1,hu:0,es:0,da:1,},
{year:1779, ja:0,en:4,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:4,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},

{year:1781, ja:0,en:4,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:5,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},
{year:1781, ja:0,en:4,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:6,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},

{year:1783, ja:0,en:5,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:6,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},

{year:1784, ja:0,en:6,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:6,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},
{year:1784, ja:0,en:6,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:7,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},

{year:1785, ja:0,en:7,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:7,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},

{year:1786, ja:0,en:8,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:7,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},
{year:1786, ja:0,en:8,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:8,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},

{year:1788, ja:0,en:8,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:9,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},

{year:1789, ja:0,en:9,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:9,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},
{year:1789, ja:0,en:10,ko:0,tr:0,el:0,nl:0,he:0,cs:0,it:0,is:0,fr:9,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},
{year:1789, ja:0,en:10,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:0,is:0,fr:9,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},

{year:1790, ja:0,en:10,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:0,is:0,fr:10,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},
{year:1790, ja:0,en:10,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:0,is:0,fr:11,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},
{year:1790, ja:0,en:10,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:1,is:0,fr:11,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},

{year:1791, ja:0,en:11,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:1,is:0,fr:11,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},
{year:1791, ja:0,en:11,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:1,is:0,fr:12,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},
{year:1791, ja:0,en:12,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:1,is:0,fr:12,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},

{year:1792, ja:0,en:12,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:1,is:0,fr:13,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:2,hu:0,es:0,da:1,},
{year:1792, ja:0,en:12,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:1,is:0,fr:13,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:3,hu:0,es:0,da:1,},
{year:1792, ja:0,en:12,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:1,is:0,fr:13,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:3,hu:0,es:1,da:1,},

{year:1793, ja:0,en:13,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:1,is:0,fr:13,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:3,hu:0,es:1,da:1,},
{year:1793, ja:0,en:14,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:1,is:0,fr:13,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:3,hu:0,es:1,da:1,},

{year:1794, ja:0,en:14,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:1,is:0,fr:14,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:3,hu:0,es:1,da:1,},
{year:1794, ja:0,en:14,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:1,is:0,fr:14,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:4,hu:0,es:1,da:1,},
{year:1794, ja:0,en:14,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:1,is:0,fr:14,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:4,hu:0,es:2,da:1,},

{year:1796, ja:0,en:15,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:1,is:0,fr:14,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:4,hu:0,es:2,da:1,},
{year:1796, ja:0,en:15,ko:0,tr:0,el:0,nl:1,he:0,cs:0,it:1,is:0,fr:14,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:5,hu:0,es:2,da:1,},
{year:1796, ja:0,en:15,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:14,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:5,hu:0,es:2,da:1,},
{year:1796, ja:0,en:15,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:14,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:6,hu:0,es:2,da:1,},

{year:1797, ja:0,en:16,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:14,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:6,hu:0,es:2,da:1,},

{year:1799, ja:0,en:17,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:14,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:6,hu:0,es:2,da:1,},
{year:1799, ja:0,en:17,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:14,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:7,hu:0,es:2,da:1,},

{year:1800, ja:0,en:17,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:15,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:0,fa:0,pt:0,sr:0,pl:0,de:7,hu:0,es:2,da:1,},
{year:1800, ja:0,en:17,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:15,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:1,fa:0,pt:0,sr:0,pl:0,de:7,hu:0,es:2,da:1,},
{year:1800, ja:0,en:17,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:15,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:1,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:2,da:1,},
{year:1800, ja:0,en:17,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:15,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:2,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:2,da:1,},

{year:1801, ja:0,en:18,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:15,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:2,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:2,da:1,},
{year:1801, ja:0,en:19,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:15,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:2,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:2,da:1,},

{year:1802, ja:0,en:20,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:15,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:2,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:2,da:1,},
{year:1802, ja:0,en:20,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:16,ru:0,zh:0,ro:0,fi:0,ar:0,ca:0,sv:2,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:2,da:1,},
{year:1802, ja:0,en:20,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:16,ru:1,zh:0,ro:0,fi:0,ar:0,ca:0,sv:2,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:2,da:1,},

{year:1804, ja:0,en:21,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:16,ru:1,zh:0,ro:0,fi:0,ar:0,ca:0,sv:2,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:2,da:1,},
{year:1804, ja:0,en:22,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:16,ru:1,zh:0,ro:0,fi:0,ar:0,ca:0,sv:2,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:2,da:1,},
{year:1804, ja:0,en:22,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:16,ru:1,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:2,da:1,},

{year:1805, ja:0,en:23,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:16,ru:1,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:2,da:1,},
{year:1805, ja:0,en:24,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:16,ru:1,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:2,da:1,},
{year:1805, ja:0,en:25,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:16,ru:1,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:2,da:1,},
{year:1805, ja:0,en:26,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:16,ru:1,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:2,da:1,},
{year:1805, ja:0,en:26,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:16,ru:1,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:3,da:1,},

{year:1806, ja:0,en:27,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:16,ru:1,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:3,da:1,},
{year:1806, ja:0,en:27,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:17,ru:1,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:8,hu:0,es:3,da:1,},
{year:1806, ja:0,en:27,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:17,ru:1,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:9,hu:0,es:3,da:1,},

{year:1808, ja:0,en:27,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:17,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:9,hu:0,es:3,da:1,},

{year:1809, ja:0,en:28,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:17,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:9,hu:0,es:3,da:1,},
{year:1809, ja:0,en:29,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:17,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:9,hu:0,es:3,da:1,},

{year:1810, ja:0,en:29,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:9,hu:0,es:3,da:1,},
{year:1810, ja:0,en:29,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:10,hu:0,es:3,da:1,},

{year:1811, ja:0,en:30,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:10,hu:0,es:3,da:1,},
{year:1811, ja:0,en:31,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:10,hu:0,es:3,da:1,},
{year:1811, ja:0,en:32,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:0,sr:0,pl:0,de:10,hu:0,es:3,da:1,},
{year:1811, ja:0,en:32,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:0,pl:0,de:10,hu:0,es:3,da:1,},

{year:1812, ja:0,en:33,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:0,pl:0,de:10,hu:0,es:3,da:1,},
{year:1812, ja:0,en:34,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:0,pl:0,de:10,hu:0,es:3,da:1,},
{year:1812, ja:0,en:34,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:0,pl:0,de:11,hu:0,es:3,da:1,},

{year:1814, ja:0,en:35,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:0,pl:0,de:11,hu:0,es:3,da:1,},
{year:1814, ja:0,en:35,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:0,pl:0,de:12,hu:0,es:3,da:1,},
{year:1814, ja:0,en:35,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:0,pl:1,de:12,hu:0,es:3,da:1,},

{year:1816, ja:0,en:36,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:0,pl:1,de:12,hu:0,es:3,da:1,},
{year:1816, ja:0,en:36,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:12,hu:0,es:3,da:1,},
{year:1816, ja:0,en:36,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1817, ja:0,en:37,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},
{year:1817, ja:0,en:38,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1818, ja:0,en:39,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1819, ja:0,en:40,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},
{year:1819, ja:0,en:41,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1821, ja:0,en:42,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1822, ja:0,en:43,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:18,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},
{year:1822, ja:0,en:43,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1826, ja:0,en:44,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1827, ja:0,en:45,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1828, ja:0,en:46,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},
{year:1828, ja:0,en:47,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1829, ja:0,en:48,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1831, ja:0,en:49,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1834, ja:0,en:50,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1835, ja:0,en:51,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1836, ja:0,en:52,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},
{year:1836, ja:0,en:53,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1837, ja:0,en:54,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1838, ja:0,en:55,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},
{year:1838, ja:0,en:56,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1839, ja:0,en:57,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},
{year:1839, ja:0,en:58,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1840, ja:0,en:59,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},
{year:1840, ja:0,en:60,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1843, ja:0,en:61,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:19,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},
{year:1843, ja:0,en:61,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},

{year:1846, ja:0,en:62,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},
{year:1846, ja:0,en:63,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:13,hu:0,es:3,da:1,},
{year:1846, ja:0,en:63,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:14,hu:0,es:3,da:1,},

{year:1847, ja:0,en:64,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:14,hu:0,es:3,da:1,},

{year:1848, ja:0,en:65,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:14,hu:0,es:3,da:1,},
{year:1848, ja:0,en:66,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:14,hu:0,es:3,da:1,},

{year:1850, ja:0,en:67,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:1,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:14,hu:0,es:3,da:1,},

{year:1851, ja:0,en:67,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:14,hu:0,es:3,da:1,},

{year:1852, ja:0,en:68,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:14,hu:0,es:3,da:1,},

{year:1853, ja:0,en:69,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:14,hu:0,es:3,da:1,},

{year:1854, ja:0,en:70,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:14,hu:0,es:3,da:1,},

{year:1855, ja:0,en:71,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:14,hu:0,es:3,da:1,},

{year:1857, ja:0,en:71,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:15,hu:0,es:3,da:1,},

{year:1859, ja:0,en:72,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:20,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:15,hu:0,es:3,da:1,},
{year:1859, ja:0,en:72,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:15,hu:0,es:3,da:1,},

{year:1860, ja:0,en:73,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:15,hu:0,es:3,da:1,},

{year:1861, ja:0,en:74,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:15,hu:0,es:3,da:1,},
{year:1861, ja:0,en:74,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},

{year:1863, ja:0,en:75,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},
{year:1863, ja:0,en:76,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},

{year:1864, ja:0,en:77,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},

{year:1865, ja:0,en:78,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:2,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},

{year:1866, ja:0,en:78,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},

{year:1867, ja:0,en:79,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},

{year:1869, ja:0,en:80,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},
{year:1869, ja:0,en:81,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},

{year:1870, ja:0,en:82,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},
{year:1870, ja:0,en:83,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},

{year:1872, ja:0,en:84,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},
{year:1872, ja:0,en:85,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},
{year:1872, ja:0,en:86,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},

{year:1873, ja:0,en:87,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},

{year:1874, ja:0,en:88,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},

{year:1875, ja:0,en:89,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},

{year:1877, ja:0,en:90,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},

{year:1878, ja:0,en:91,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},
{year:1878, ja:0,en:92,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:16,hu:0,es:3,da:1,},
{year:1878, ja:0,en:92,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:17,hu:0,es:3,da:1,},

{year:1879, ja:0,en:92,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:18,hu:0,es:3,da:1,},

{year:1880, ja:0,en:93,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:18,hu:0,es:3,da:1,},
{year:1880, ja:0,en:94,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:21,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:18,hu:0,es:3,da:1,},
{year:1880, ja:0,en:94,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:22,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:18,hu:0,es:3,da:1,},
{year:1880, ja:0,en:95,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:22,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:18,hu:0,es:3,da:1,},

{year:1881, ja:0,en:96,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:22,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:18,hu:0,es:3,da:1,},

{year:1882, ja:0,en:96,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:22,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1884, ja:0,en:97,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:22,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1884, ja:1,en:97,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:22,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1885, ja:1,en:98,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:22,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1885, ja:2,en:98,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:22,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1886, ja:2,en:99,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:22,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1887, ja:2,en:100,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:22,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1887, ja:2,en:101,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:22,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1888, ja:2,en:101,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1889, ja:2,en:102,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1889, ja:2,en:103,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1890, ja:2,en:104,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1891, ja:2,en:105,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1891, ja:2,en:106,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:3,zh:0,ro:0,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1891, ja:2,en:106,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:3,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1892, ja:2,en:107,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:3,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1892, ja:2,en:108,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:3,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1892, ja:3,en:108,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:3,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1893, ja:3,en:109,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:3,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1895, ja:3,en:110,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:3,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1895, ja:3,en:111,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:3,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1895, ja:3,en:111,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1895, ja:3,en:112,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1896, ja:3,en:113,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1898, ja:3,en:114,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1899, ja:3,en:115,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1900, ja:3,en:116,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1901, ja:3,en:117,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1901, ja:3,en:118,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1901, ja:3,en:119,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:0,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1901, ja:3,en:119,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:1,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1901, ja:3,en:120,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:1,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1901, ja:3,en:121,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:1,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1902, ja:3,en:122,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:1,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1903, ja:3,en:122,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1903, ja:3,en:123,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1903, ja:3,en:124,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1903, ja:3,en:125,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1904, ja:3,en:126,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1904, ja:3,en:127,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1904, ja:3,en:128,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},
{year:1904, ja:3,en:129,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:19,hu:0,es:3,da:1,},

{year:1905, ja:3,en:129,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:20,hu:0,es:3,da:1,},
{year:1905, ja:3,en:130,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:20,hu:0,es:3,da:1,},
{year:1905, ja:3,en:131,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:20,hu:0,es:3,da:1,},

{year:1907, ja:3,en:132,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:20,hu:0,es:3,da:1,},

{year:1908, ja:3,en:133,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:20,hu:0,es:3,da:1,},
{year:1908, ja:3,en:134,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:23,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:20,hu:0,es:3,da:1,},
{year:1908, ja:3,en:134,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:20,hu:0,es:3,da:1,},
{year:1908, ja:3,en:134,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:4,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:21,hu:0,es:3,da:1,},
{year:1908, ja:3,en:134,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:21,hu:0,es:3,da:1,},

{year:1909, ja:3,en:135,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:3,fa:0,pt:1,sr:1,pl:1,de:21,hu:0,es:3,da:1,},
{year:1909, ja:3,en:135,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:21,hu:0,es:3,da:1,},

{year:1910, ja:3,en:136,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:21,hu:0,es:3,da:1,},
{year:1910, ja:3,en:136,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:22,hu:0,es:3,da:1,},
{year:1910, ja:4,en:136,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:22,hu:0,es:3,da:1,},

{year:1913, ja:4,en:137,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:22,hu:0,es:3,da:1,},
{year:1913, ja:4,en:138,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:22,hu:0,es:3,da:1,},

{year:1919, ja:4,en:139,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:22,hu:0,es:3,da:1,},

{year:1920, ja:4,en:140,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:22,hu:0,es:3,da:1,},
{year:1920, ja:4,en:141,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:22,hu:0,es:3,da:1,},
{year:1920, ja:4,en:141,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:23,hu:0,es:3,da:1,},

{year:1921, ja:4,en:142,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:23,hu:0,es:3,da:1,},
{year:1921, ja:5,en:142,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:23,hu:0,es:3,da:1,},

{year:1923, ja:5,en:143,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:23,hu:0,es:3,da:1,},
{year:1923, ja:5,en:144,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:23,hu:0,es:3,da:1,},
{year:1923, ja:5,en:144,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:24,hu:0,es:3,da:1,},
{year:1923, ja:6,en:144,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:24,hu:0,es:3,da:1,},

{year:1924, ja:6,en:145,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:24,hu:0,es:3,da:1,},
{year:1924, ja:6,en:145,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:25,hu:0,es:3,da:1,},
{year:1924, ja:6,en:146,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:5,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:25,hu:0,es:3,da:1,},
{year:1924, ja:6,en:146,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:6,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:25,hu:0,es:3,da:1,},

{year:1925, ja:6,en:147,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:6,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:25,hu:0,es:3,da:1,},
{year:1925, ja:7,en:147,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:6,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:25,hu:0,es:3,da:1,},
{year:1925, ja:8,en:147,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:6,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:25,hu:0,es:3,da:1,},
{year:1925, ja:9,en:147,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:6,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:25,hu:0,es:3,da:1,},

{year:1926, ja:9,en:148,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:6,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:25,hu:0,es:3,da:1,},
{year:1926, ja:9,en:149,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:6,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:25,hu:0,es:3,da:1,},
{year:1926, ja:10,en:149,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:6,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:25,hu:0,es:3,da:1,},
{year:1926, ja:10,en:149,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:2,is:0,fr:24,ru:7,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:25,hu:0,es:3,da:1,},

{year:1927, ja:10,en:149,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:3,is:0,fr:24,ru:7,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:25,hu:0,es:3,da:1,},
{year:1927, ja:10,en:149,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:4,is:0,fr:24,ru:7,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:25,hu:0,es:3,da:1,},
{year:1927, ja:11,en:149,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:4,is:0,fr:24,ru:7,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:1,de:25,hu:0,es:3,da:1,},
{year:1927, ja:11,en:149,ko:0,tr:0,el:0,nl:2,he:0,cs:0,it:4,is:0,fr:24,ru:7,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:2,de:25,hu:0,es:3,da:1,},

{year:1928, ja:11,en:149,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:7,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:2,de:25,hu:0,es:3,da:1,},
{year:1928, ja:12,en:149,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:7,zh:2,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:2,de:25,hu:0,es:3,da:1,},

{year:1929, ja:12,en:149,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:7,zh:3,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:2,de:25,hu:0,es:3,da:1,},

{year:1930, ja:12,en:150,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:7,zh:3,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:2,de:25,hu:0,es:3,da:1,},
{year:1930, ja:12,en:150,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:7,zh:4,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:2,de:25,hu:0,es:3,da:1,},

{year:1931, ja:12,en:150,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:7,zh:5,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:2,de:25,hu:0,es:3,da:1,},

{year:1932, ja:13,en:150,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:7,zh:5,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:2,de:25,hu:0,es:3,da:1,},

{year:1931, ja:13,en:150,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:8,zh:5,ro:1,fi:0,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:2,de:25,hu:0,es:3,da:1,},

{year:1933, ja:13,en:150,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:8,zh:5,ro:1,fi:1,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:2,de:25,hu:0,es:3,da:1,},
{year:1933, ja:13,en:150,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:8,zh:5,ro:1,fi:1,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:2,de:26,hu:0,es:3,da:1,},
{year:1933, ja:14,en:150,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:8,zh:5,ro:1,fi:1,ar:0,ca:0,sv:4,fa:0,pt:1,sr:1,pl:2,de:26,hu:0,es:3,da:1,},
{year:1933, ja:14,en:150,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:8,zh:5,ro:1,fi:1,ar:0,ca:1,sv:4,fa:0,pt:1,sr:1,pl:2,de:26,hu:0,es:3,da:1,},
{year:1933, ja:14,en:151,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:8,zh:5,ro:1,fi:1,ar:0,ca:1,sv:4,fa:0,pt:1,sr:1,pl:2,de:26,hu:0,es:3,da:1,},

{year:1934, ja:14,en:152,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:8,zh:5,ro:1,fi:1,ar:0,ca:1,sv:4,fa:0,pt:1,sr:1,pl:2,de:26,hu:0,es:3,da:1,},
{year:1934, ja:14,en:152,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:8,zh:5,ro:2,fi:1,ar:0,ca:1,sv:4,fa:0,pt:1,sr:1,pl:2,de:26,hu:0,es:3,da:1,},

{year:1935, ja:14,en:153,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:8,zh:5,ro:2,fi:1,ar:0,ca:1,sv:4,fa:0,pt:1,sr:1,pl:2,de:26,hu:0,es:3,da:1,},
{year:1935, ja:14,en:153,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:9,zh:5,ro:2,fi:1,ar:0,ca:1,sv:4,fa:0,pt:1,sr:1,pl:2,de:26,hu:0,es:3,da:1,},

{year:1936, ja:14,en:153,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:9,zh:6,ro:2,fi:1,ar:0,ca:1,sv:4,fa:0,pt:1,sr:1,pl:2,de:26,hu:0,es:3,da:1,},
{year:1936, ja:14,en:153,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:9,zh:6,ro:2,fi:1,ar:0,ca:1,sv:4,fa:0,pt:2,sr:1,pl:2,de:26,hu:0,es:3,da:1,},

{year:1937, ja:14,en:154,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:9,zh:6,ro:2,fi:1,ar:0,ca:1,sv:4,fa:0,pt:2,sr:1,pl:2,de:26,hu:0,es:3,da:1,},
{year:1937, ja:14,en:155,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:9,zh:6,ro:2,fi:1,ar:0,ca:1,sv:4,fa:0,pt:2,sr:1,pl:2,de:26,hu:0,es:3,da:1,},

{year:1940, ja:14,en:156,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:9,zh:6,ro:2,fi:1,ar:0,ca:1,sv:4,fa:0,pt:2,sr:1,pl:2,de:26,hu:0,es:3,da:1,},
{year:1940, ja:14,en:156,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:1,sv:4,fa:0,pt:2,sr:1,pl:2,de:26,hu:0,es:3,da:1,},
{year:1940, ja:15,en:156,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:1,sv:4,fa:0,pt:2,sr:1,pl:2,de:26,hu:0,es:3,da:1,},
{year:1940, ja:15,en:157,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:1,sv:4,fa:0,pt:2,sr:1,pl:2,de:26,hu:0,es:3,da:1,},

{year:1942, ja:15,en:158,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:4,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:1,sv:4,fa:0,pt:2,sr:1,pl:2,de:26,hu:0,es:3,da:1,},

{year:1945, ja:15,en:158,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:5,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:1,sv:4,fa:0,pt:2,sr:1,pl:2,de:26,hu:0,es:3,da:1,},

{year:1946, ja:15,en:159,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:5,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:1,sv:4,fa:0,pt:2,sr:1,pl:2,de:26,hu:0,es:3,da:1,},
{year:1946, ja:15,en:159,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:5,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:1,sv:4,fa:0,pt:2,sr:1,pl:2,de:27,hu:0,es:3,da:1,},
{year:1946, ja:15,en:160,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:5,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:1,sv:4,fa:0,pt:2,sr:1,pl:2,de:27,hu:0,es:3,da:1,},

{year:1947, ja:16,en:160,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:5,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:1,sv:4,fa:0,pt:2,sr:1,pl:2,de:27,hu:0,es:3,da:1,},
{year:1947, ja:16,en:160,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:5,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:27,hu:0,es:3,da:1,},

{year:1948, ja:16,en:161,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:5,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:27,hu:0,es:3,da:1,},
{year:1948, ja:16,en:162,ko:0,tr:0,el:0,nl:2,he:0,cs:1,it:5,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:27,hu:0,es:3,da:1,},
{year:1948, ja:16,en:162,ko:0,tr:0,el:1,nl:2,he:0,cs:1,it:5,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:27,hu:0,es:3,da:1,},
{year:1948, ja:16,en:162,ko:0,tr:0,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:27,hu:0,es:3,da:1,},
{year:1948, ja:17,en:162,ko:0,tr:0,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:27,hu:0,es:3,da:1,},
{year:1948, ja:17,en:162,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:27,hu:0,es:3,da:1,},
{year:1948, ja:18,en:162,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:27,hu:0,es:3,da:1,},
{year:1948, ja:19,en:162,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:27,hu:0,es:3,da:1,},

{year:1949, ja:20,en:162,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:27,hu:0,es:3,da:1,},
{year:1949, ja:21,en:162,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:27,hu:0,es:3,da:1,},
{year:1949, ja:21,en:162,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:28,hu:0,es:3,da:1,},

{year:1950, ja:21,en:163,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:24,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:28,hu:0,es:3,da:1,},
{year:1950, ja:21,en:163,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:25,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:28,hu:0,es:3,da:1,},
{year:1950, ja:21,en:163,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:26,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:28,hu:0,es:3,da:1,},

{year:1952, ja:21,en:164,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:26,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:28,hu:0,es:3,da:1,},
{year:1952, ja:21,en:165,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:26,ru:9,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:28,hu:0,es:3,da:1,},
{year:1952, ja:21,en:165,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:26,ru:10,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:28,hu:0,es:3,da:1,},

{year:1953, ja:21,en:166,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:26,ru:10,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:28,hu:0,es:3,da:1,},

{year:1954, ja:22,en:166,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:26,ru:10,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:2,de:28,hu:0,es:3,da:1,},
{year:1954, ja:22,en:166,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:6,is:0,fr:26,ru:10,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:3,da:1,},

{year:1955, ja:22,en:166,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:7,is:0,fr:26,ru:10,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:3,da:1,},
{year:1955, ja:22,en:167,ko:0,tr:1,el:1,nl:2,he:0,cs:1,it:7,is:0,fr:26,ru:10,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:3,da:1,},
{year:1955, ja:22,en:167,ko:0,tr:2,el:1,nl:2,he:0,cs:1,it:7,is:0,fr:26,ru:10,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:3,da:1,},

{year:1956, ja:22,en:167,ko:0,tr:2,el:1,nl:2,he:0,cs:1,it:7,is:0,fr:26,ru:10,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:4,da:1,},

{year:1957, ja:22,en:168,ko:0,tr:2,el:1,nl:2,he:0,cs:1,it:7,is:0,fr:26,ru:10,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:4,da:1,},
{year:1957, ja:22,en:168,ko:1,tr:2,el:1,nl:2,he:0,cs:1,it:7,is:0,fr:26,ru:10,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:4,da:1,},
{year:1957, ja:22,en:168,ko:2,tr:2,el:1,nl:2,he:0,cs:1,it:7,is:0,fr:26,ru:10,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:4,da:1,},

{year:1958, ja:22,en:168,ko:2,tr:2,el:1,nl:2,he:0,cs:2,it:7,is:0,fr:26,ru:10,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:4,da:1,},
{year:1958, ja:22,en:168,ko:2,tr:2,el:1,nl:2,he:0,cs:2,it:7,is:0,fr:26,ru:10,zh:6,ro:3,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:5,da:1,},

{year:1959, ja:22,en:168,ko:2,tr:2,el:1,nl:2,he:0,cs:2,it:7,is:0,fr:26,ru:10,zh:6,ro:4,fi:1,ar:0,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:5,da:1,},
{year:1959, ja:22,en:168,ko:2,tr:2,el:1,nl:2,he:0,cs:2,it:7,is:0,fr:26,ru:10,zh:6,ro:4,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:5,da:1,},
{year:1959, ja:23,en:168,ko:2,tr:2,el:1,nl:2,he:0,cs:2,it:7,is:0,fr:26,ru:10,zh:6,ro:4,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:5,da:1,},
{year:1959, ja:24,en:168,ko:2,tr:2,el:1,nl:2,he:0,cs:2,it:7,is:0,fr:26,ru:10,zh:6,ro:4,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:5,da:1,},
{year:1959, ja:24,en:168,ko:2,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:10,zh:6,ro:4,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:5,da:1,},

{year:1960, ja:24,en:168,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:10,zh:6,ro:4,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:5,da:1,},

{year:1961, ja:24,en:169,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:10,zh:6,ro:4,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:5,da:1,},
{year:1961, ja:24,en:170,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:10,zh:6,ro:4,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:5,da:1,},
{year:1961, ja:25,en:170,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:10,zh:6,ro:4,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:5,da:1,},
{year:1961, ja:25,en:170,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:10,zh:6,ro:4,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:6,da:1,},

{year:1962, ja:25,en:170,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:10,zh:6,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:6,da:1,},
{year:1962, ja:25,en:170,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:11,zh:6,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:6,da:1,},

{year:1963, ja:25,en:171,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:11,zh:6,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:28,hu:0,es:6,da:1,},
{year:1963, ja:25,en:171,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:11,zh:6,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},
{year:1963, ja:26,en:171,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:11,zh:6,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},

{year:1964, ja:26,en:171,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:11,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},
{year:1964, ja:27,en:171,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:11,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},

{year:1965, ja:28,en:171,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:11,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},

{year:1966, ja:28,en:172,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:11,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},
{year:1966, ja:28,en:173,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:11,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},
{year:1966, ja:28,en:174,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:11,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},
{year:1966, ja:29,en:174,ko:3,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:11,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},

{year:1968, ja:29,en:174,ko:4,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:11,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},

{year:1969, ja:30,en:174,ko:4,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:11,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},
{year:1969, ja:31,en:174,ko:4,tr:2,el:1,nl:2,he:0,cs:2,it:8,is:0,fr:26,ru:11,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},
{year:1969, ja:31,en:174,ko:4,tr:2,el:1,nl:2,he:0,cs:2,it:9,is:0,fr:26,ru:11,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},

{year:1970, ja:31,en:175,ko:4,tr:2,el:1,nl:2,he:0,cs:2,it:9,is:0,fr:26,ru:11,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},
{year:1970, ja:31,en:176,ko:4,tr:2,el:1,nl:2,he:0,cs:2,it:9,is:0,fr:26,ru:11,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},
{year:1970, ja:31,en:176,ko:4,tr:2,el:1,nl:2,he:0,cs:2,it:9,is:0,fr:26,ru:12,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},
{year:1970, ja:31,en:176,ko:5,tr:2,el:1,nl:2,he:0,cs:2,it:9,is:0,fr:26,ru:12,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:1,},

{year:1971, ja:31,en:176,ko:5,tr:2,el:1,nl:2,he:0,cs:2,it:9,is:0,fr:26,ru:12,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:2,},
{year:1971, ja:31,en:176,ko:6,tr:2,el:1,nl:2,he:0,cs:2,it:9,is:0,fr:26,ru:12,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:6,da:2,},
{year:1971, ja:31,en:176,ko:6,tr:2,el:1,nl:2,he:0,cs:2,it:9,is:0,fr:26,ru:12,zh:7,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:7,da:2,},

{year:1972, ja:31,en:176,ko:6,tr:2,el:1,nl:2,he:0,cs:2,it:9,is:0,fr:26,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:7,da:2,},
{year:1972, ja:31,en:176,ko:7,tr:2,el:1,nl:2,he:0,cs:2,it:9,is:0,fr:26,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:7,da:2,},

{year:1973, ja:32,en:176,ko:7,tr:2,el:1,nl:2,he:0,cs:2,it:9,is:0,fr:26,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:7,da:2,},
{year:1973, ja:32,en:176,ko:7,tr:2,el:1,nl:2,he:0,cs:2,it:10,is:0,fr:26,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:7,da:2,},

{year:1974, ja:32,en:177,ko:7,tr:2,el:1,nl:2,he:0,cs:2,it:10,is:0,fr:26,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:29,hu:0,es:7,da:2,},
{year:1974, ja:32,en:177,ko:7,tr:2,el:1,nl:2,he:0,cs:2,it:10,is:0,fr:26,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},
{year:1974, ja:33,en:177,ko:7,tr:2,el:1,nl:2,he:0,cs:2,it:10,is:0,fr:26,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},

{year:1975, ja:33,en:178,ko:7,tr:2,el:1,nl:2,he:0,cs:2,it:10,is:0,fr:26,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},
{year:1975, ja:33,en:178,ko:7,tr:2,el:1,nl:2,he:0,cs:2,it:11,is:0,fr:26,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},

{year:1976, ja:33,en:179,ko:7,tr:2,el:1,nl:2,he:0,cs:2,it:11,is:0,fr:26,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},
{year:1976, ja:33,en:180,ko:7,tr:2,el:1,nl:2,he:0,cs:2,it:11,is:0,fr:26,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},
{year:1976, ja:33,en:180,ko:7,tr:2,el:1,nl:2,he:0,cs:2,it:11,is:0,fr:27,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},
{year:1976, ja:33,en:180,ko:7,tr:2,el:1,nl:2,he:0,cs:2,it:12,is:0,fr:27,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},
{year:1976, ja:34,en:180,ko:7,tr:2,el:1,nl:2,he:0,cs:2,it:12,is:0,fr:27,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},
{year:1976, ja:34,en:180,ko:8,tr:2,el:1,nl:2,he:0,cs:2,it:12,is:0,fr:27,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},

{year:1977, ja:34,en:181,ko:8,tr:2,el:1,nl:2,he:0,cs:2,it:12,is:0,fr:27,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},
{year:1977, ja:34,en:181,ko:8,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:8,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},
{year:1977, ja:34,en:181,ko:8,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:9,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},

{year:1978, ja:34,en:182,ko:8,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:9,ro:5,fi:1,ar:1,ca:2,sv:4,fa:0,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},
{year:1978, ja:34,en:182,ko:8,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:9,ro:5,fi:1,ar:1,ca:2,sv:4,fa:1,pt:2,sr:1,pl:3,de:30,hu:0,es:7,da:2,},
{year:1978, ja:34,en:182,ko:8,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:9,ro:5,fi:1,ar:1,ca:2,sv:4,fa:1,pt:2,sr:1,pl:3,de:31,hu:0,es:7,da:2,},
{year:1978, ja:35,en:182,ko:8,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:9,ro:5,fi:1,ar:1,ca:2,sv:4,fa:1,pt:2,sr:1,pl:3,de:31,hu:0,es:7,da:2,},
{year:1978, ja:35,en:182,ko:9,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:9,ro:5,fi:1,ar:1,ca:2,sv:4,fa:1,pt:2,sr:1,pl:3,de:31,hu:0,es:7,da:2,},
{year:1978, ja:35,en:182,ko:9,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:9,ro:5,fi:1,ar:1,ca:2,sv:4,fa:1,pt:3,sr:1,pl:3,de:31,hu:0,es:7,da:2,},

{year:1979, ja:35,en:183,ko:9,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:9,ro:5,fi:1,ar:1,ca:2,sv:4,fa:1,pt:3,sr:1,pl:3,de:31,hu:0,es:7,da:2,},
{year:1979, ja:35,en:183,ko:9,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:9,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:3,sr:1,pl:3,de:31,hu:0,es:7,da:2,},

{year:1980, ja:36,en:183,ko:9,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:9,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:3,sr:1,pl:3,de:31,hu:0,es:7,da:2,},
{year:1980, ja:36,en:183,ko:9,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:9,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:4,sr:1,pl:3,de:31,hu:0,es:7,da:2,},

{year:1981, ja:37,en:183,ko:9,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:9,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:4,sr:1,pl:3,de:31,hu:0,es:7,da:2,},
{year:1981, ja:37,en:183,ko:9,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:9,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:5,sr:1,pl:3,de:31,hu:0,es:7,da:2,},
{year:1981, ja:37,en:183,ko:9,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:5,sr:1,pl:3,de:31,hu:0,es:7,da:2,},

{year:1982, ja:37,en:184,ko:9,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:5,sr:1,pl:3,de:31,hu:0,es:7,da:2,},
{year:1982, ja:37,en:185,ko:9,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:5,sr:1,pl:3,de:31,hu:0,es:7,da:2,},
{year:1982, ja:37,en:185,ko:10,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:5,sr:1,pl:3,de:31,hu:0,es:7,da:2,},

{year:1983, ja:37,en:185,ko:11,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:5,sr:1,pl:3,de:31,hu:0,es:7,da:2,},
{year:1983, ja:37,en:185,ko:12,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:5,sr:1,pl:3,de:31,hu:0,es:7,da:2,},
{year:1983, ja:37,en:185,ko:12,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:6,sr:1,pl:3,de:31,hu:0,es:7,da:2,},

{year:1985, ja:37,en:186,ko:12,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:6,sr:1,pl:3,de:31,hu:0,es:7,da:2,},
{year:1985, ja:37,en:187,ko:12,tr:2,el:1,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:6,sr:1,pl:3,de:31,hu:0,es:7,da:2,},
{year:1985, ja:37,en:187,ko:12,tr:2,el:2,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:6,sr:1,pl:3,de:31,hu:0,es:7,da:2,},
{year:1985, ja:37,en:187,ko:12,tr:3,el:2,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:6,sr:1,pl:3,de:31,hu:0,es:7,da:2,},

{year:1986, ja:37,en:187,ko:12,tr:3,el:2,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1986, ja:37,en:188,ko:12,tr:3,el:2,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:2,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},

{year:1988, ja:37,en:188,ko:12,tr:3,el:2,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:3,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},

{year:1990, ja:37,en:189,ko:12,tr:3,el:2,nl:2,he:0,cs:2,it:13,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:3,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1990, ja:37,en:189,ko:12,tr:3,el:2,nl:2,he:0,cs:2,it:14,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:3,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},

{year:1991, ja:37,en:190,ko:12,tr:3,el:2,nl:2,he:0,cs:2,it:14,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:3,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1991, ja:37,en:191,ko:12,tr:3,el:2,nl:2,he:0,cs:2,it:14,is:0,fr:27,ru:12,zh:10,ro:5,fi:1,ar:1,ca:3,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1991, ja:37,en:191,ko:12,tr:3,el:2,nl:2,he:0,cs:2,it:14,is:0,fr:28,ru:12,zh:10,ro:5,fi:1,ar:1,ca:3,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1991, ja:37,en:191,ko:12,tr:3,el:3,nl:2,he:0,cs:2,it:14,is:0,fr:28,ru:12,zh:10,ro:5,fi:1,ar:1,ca:3,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1991, ja:37,en:191,ko:12,tr:3,el:3,nl:2,he:0,cs:2,it:14,is:0,fr:28,ru:12,zh:10,ro:5,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1991, ja:37,en:191,ko:12,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:12,zh:10,ro:5,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1991, ja:37,en:191,ko:12,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:13,zh:10,ro:5,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},

{year:1992, ja:37,en:191,ko:12,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:13,zh:10,ro:6,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1992, ja:37,en:191,ko:13,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:13,zh:10,ro:6,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1992, ja:37,en:191,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:13,zh:10,ro:6,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1992, ja:37,en:191,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:13,zh:10,ro:7,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},

{year:1993, ja:37,en:192,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:13,zh:10,ro:7,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1993, ja:37,en:193,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:13,zh:10,ro:7,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1993, ja:38,en:193,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:13,zh:10,ro:7,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1993, ja:38,en:193,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:14,zh:10,ro:7,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1993, ja:38,en:193,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:15,zh:10,ro:7,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1993, ja:38,en:193,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},

{year:1994, ja:38,en:194,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1994, ja:38,en:195,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:7,da:2,},
{year:1994, ja:38,en:195,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:4,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:8,da:2,},
{year:1994, ja:38,en:195,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:8,da:2,},

{year:1995, ja:38,en:196,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:8,da:2,},
{year:1995, ja:38,en:197,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:28,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:8,da:2,},
{year:1995, ja:38,en:197,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:15,is:0,fr:29,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:8,da:2,},
{year:1995, ja:38,en:197,ko:14,tr:3,el:3,nl:2,he:0,cs:2,it:16,is:0,fr:29,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:8,da:2,},

{year:1996, ja:38,en:197,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:16,is:0,fr:29,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:8,da:2,},
{year:1996, ja:38,en:197,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:16,is:0,fr:29,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:9,da:2,},
{year:1996, ja:38,en:197,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:16,is:0,fr:29,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:10,da:2,},

{year:1997, ja:38,en:198,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:16,is:0,fr:29,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:10,da:2,},
{year:1997, ja:38,en:198,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:16,is:1,fr:29,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:10,da:2,},
{year:1997, ja:38,en:198,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:16,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:10,da:2,},
{year:1997, ja:38,en:198,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:10,da:2,},

{year:1998, ja:38,en:199,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:10,da:2,},
{year:1998, ja:38,en:200,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:0,es:10,da:2,},
{year:1998, ja:38,en:200,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:1,es:10,da:2,},

{year:1999, ja:38,en:201,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:1,es:10,da:2,},
{year:1999, ja:38,en:202,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:32,hu:1,es:10,da:2,},
{year:1999, ja:38,en:202,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:33,hu:1,es:10,da:2,},
{year:1999, ja:38,en:203,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:33,hu:1,es:10,da:2,},
{year:1999, ja:38,en:204,ko:14,tr:3,el:3,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:33,hu:1,es:10,da:2,},
{year:1999, ja:38,en:204,ko:14,tr:3,el:4,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:33,hu:1,es:10,da:2,},

{year:2000, ja:38,en:205,ko:14,tr:3,el:4,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:10,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:33,hu:1,es:10,da:2,},
{year:2000, ja:38,en:205,ko:14,tr:3,el:4,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:11,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:33,hu:1,es:10,da:2,},
{year:2000, ja:38,en:205,ko:14,tr:3,el:5,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:11,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:33,hu:1,es:10,da:2,},
{year:2000, ja:39,en:205,ko:14,tr:3,el:5,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:11,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:33,hu:1,es:10,da:2,},

{year:2001, ja:39,en:205,ko:14,tr:3,el:5,nl:2,he:1,cs:2,it:17,is:1,fr:29,ru:17,zh:12,ro:7,fi:1,ar:1,ca:4,sv:5,fa:2,pt:6,sr:1,pl:3,de:33,hu:1,es:10,da:2,},
];

module.exports.getYrLng = function(){
	return YrLng;//()
}

}());



(function() {

var langs =	['ja','en','ko','tr','el','nl','he','cs','it','is','fr','ru','zh','ro','fi','ar','ca','sv','fa','pt','sr','pl','de','hu','es','da']; 

module.exports.getlangs = function(){
	return langs;
}



}());

(function() {

var langkey =	[
{short:'ja',long:"japanese"},
{short:'en',long:"english"},
{short:'ko',long:"korean"},
{short:'tr',long:"turkish"},
{short:'el',long:"greek"},
{short:'nl',long:"dutch"},
{short:'he',long:"hebrew"},
{short:'cs',long:"czech"},
{short:'it',long:"italian"},
{short:'is',long:"icelandic"},
{short:'fr',long:"french"},
{short:'ru',long:"russian"},
{short:'zh',long:"chinese"},
{short:'ro',long:"romanian"},
{short:'fi',long:"finnish"},
{short:'ar',long:"arabic"},
{short:'ca',long:"catalan"},
{short:'sv',long:"swedish"},
{short:'fa',long:"persian"},
{short:'pt',long:"portuguese"},
{short:'sr',long:"serbian"},
{short:'pl',long:"polish"},
{short:'de',long:"german"},
{short:'hu',long:"hungarian"},
{short:'es',long:"spanish"},
{short:'da',long:"danish"}
];

module.exports.getlangkey = function(){
	return langkey;
}

}());
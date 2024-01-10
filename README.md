<h1>Google App Scripts</h1>

This repository is a collection of scripts that I have used in the processing of my notion google sheets itself.

<b>Demo viewable at:</b> https://docs.google.com/spreadsheets/d/1ViopvzfCvcuMv_1Ps0EqNGq_oKcRmZjA-HzWX9F42ik/edit#gid=1188826729

<h2>Functions:</h2>

<b>Menu</b> - Simple interface for selecting process in document

<b>SortImports</b> - Over time, due to evolutions in the complexity of the project, including new additions of metrics to be tracked, as well as naming convention improvements, discrepancies in the arrangements of the columns in the workouts began to occur. 
                    This sorting function was a learning opportunity to programmatically correct the erroneous old format into a new consolidated form. This involved defining a "catalogue" of terms to be converted, as well as defining the appropriate columns for the old data to be relocated to according to the updated schema.

<b>Expand Rows</b> - In earlier versions, I recorded what is known as a "drop-set" with the "->" notation. Later this needed to be corrected while cleaning the data, and this function was written to expand each set marked with the erroneous "->" to the corrected format.

<b>Find Replace</b> -  Simple customized search and replace api request to google sheets to correct importing errors such as "=", "->", or naming conventions.

<b>RemoveHeaders</b> - While batch importing the individual workout recordings, the header row is preserved. This function was written to search through and remove all instance of headers throughout the imported pages.



                    

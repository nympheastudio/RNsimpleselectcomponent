# RNsimpleselectcomponent
react native, simple select component

# usage 

import component :
import SimpleSelectComponent  from "./SimpleSelectComponent";

    const handleItemSelected = (item) => {
      // Handle the selected item here
      setMyItem(item.id);
    };
  

call JSX : 
<SimpleSelectComponent onItemSelected={handleItemSelected} list={CartesAchetees}
placeholder={'Select'}
/>

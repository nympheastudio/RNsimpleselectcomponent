# RNsimpleselectcomponent
react native, simple select component

# usage 


import SimpleSelectComponent  from "./SimpleSelectComponent";

const handleItemSelected = (item) => {
// Handle the selected item here
setMyItem(item.id);
};

<SimpleSelectComponent onItemSelected={handleItemSelected} list={CartesAchetees}
placeholder={'Select'}
/>

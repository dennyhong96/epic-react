// React.memo for reducing unnecessary re-renders
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {useCombobox} from '../use-combobox'
import {getItems} from '../workerized-filter-cities'
import {useAsync, useForceRerender} from '../utils'

const Menu = React.memo(function Menu({
  items,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
}) {
  return (
    <ul {...getMenuProps()}>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          getItemProps={getItemProps}
          item={item}
          index={index}
          isSelected={selectedItem?.id === item.id}
          isHighlighted={highlightedIndex === index}
        >
          {item.name}
        </ListItem>
      ))}
    </ul>
  )
})
// 🐨 Memoize the Menu here using React.memo

const ListItem = React.memo(function ListItem({
  getItemProps,
  item,
  index,

  // React.memo() does shallow comparasion for props
  // pass primitive value as props, so we don't need to use custom comparator for React.memo()
  // calculations can be done higher up in the tree
  isSelected,
  isHighlighted,

  ...props
}) {
  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          fontWeight: isSelected ? 'bold' : 'normal',
          backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
        },
        ...props,
      })}
    />
  )
})

// const ListItem = React.memo(
//   function ({
//     getItemProps,
//     item,
//     index,
//     selectedItem,
//     highlightedIndex,
//     ...props
//   }) {
//     const isSelected = selectedItem?.id === item.id
//     const isHighlighted = highlightedIndex === index
//     return (
//       <li
//         {...getItemProps({
//           index,
//           item,
//           style: {
//             fontWeight: isSelected ? 'bold' : 'normal',
//             backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
//           },
//           ...props,
//         })}
//       />
//     )
//   },
//   (prevProps, nextProps) => {
//     // true means do NOT rerender
//     // false means DO rerender

//     // these ones are easy if any of these changed, we should re-render
//     if (prevProps.getItemProps !== nextProps.getItemProps) return false
//     if (prevProps.item !== nextProps.item) return false
//     if (prevProps.index !== nextProps.index) return false
//     if (prevProps.selectedItem !== nextProps.selectedItem) return false

//     // this is trickier. We should only re-render if this list item:
//     // 1. was highlighted before and now it's not
//     // 2. was not highlighted before and now it is
//     if (prevProps.highlightedIndex !== nextProps.highlightedIndex) {
//       const wasPrevHighlighted = prevProps.highlightedIndex === prevProps.index
//       const isNowHighlighted = nextProps.highlightedIndex === nextProps.index
//       return wasPrevHighlighted === isNowHighlighted
//     }
//     return true
//   },
// )
// 🐨 Memoize the ListItem here using React.memo

function App() {
  const forceRerender = useForceRerender()
  const [inputValue, setInputValue] = React.useState('')

  const {data: allItems, run} = useAsync({data: [], status: 'pending'})
  React.useEffect(() => {
    run(getItems(inputValue))
  }, [inputValue, run])
  const items = allItems.slice(0, 100)

  const {
    selectedItem,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    selectItem,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({inputValue: newValue}) => setInputValue(newValue),
    onSelectedItemChange: ({selectedItem}) =>
      alert(
        selectedItem
          ? `You selected ${selectedItem.name}`
          : 'Selection Cleared',
      ),
    itemToString: item => (item ? item.name : ''),
  })

  return (
    <div className="city-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({type: 'text'})} />
          <button onClick={() => selectItem(null)} aria-label="toggle menu">
            &#10005;
          </button>
        </div>
        <Menu
          items={items}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
          selectedItem={selectedItem}
        />
      </div>
    </div>
  )
}

export default App

/*
eslint
  no-func-assign: 0,
*/

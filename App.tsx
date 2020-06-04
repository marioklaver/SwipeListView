import React, {useState} from 'react';
import {
  PixelRatio,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import {SwipeListView} from 'react-native-swipe-list-view';

interface Section {
  title: string;
  data: Item[];
}

interface Item {
  id: string;
  text: string;
  section: string;
}

const list = [
  {
    id: '1',
    text: 'Text 1',
    section: 'Section 1',
  },
  {
    id: '2',
    text: 'Text 2',
    section: 'Section 1',
  },
  {
    id: '3',
    text: 'Text 3',
    section: 'Section 1',
  },
  {
    id: '4',
    text: 'Text 4',
    section: 'Section 1',
  },
  {
    id: '5',
    text: 'Text 5',
    section: 'Section 2',
  },
  {
    id: '6',
    text: 'Text 6',
    section: 'Section 2',
  },
  {
    id: '7',
    text: 'Text 7',
    section: 'Section 2',
  },
  {
    id: '8',
    text: 'Text 8',
    section: 'Section 2',
  },
  {
    id: '9',
    text: 'Text 9',
    section: 'Section 2',
  },
  {
    id: '10',
    text: 'Text 10',
    section: 'Section 2',
  },
  {
    id: '11',
    text: 'Text 11',
    section: 'Section 2',
  },
  {
    id: '12',
    text: 'Text 12',
    section: 'Section 2',
  },
];

const ListItem = styled.View`
  background-color: white;
  height: 80px;
  justify-content: center;
  padding: 20px;
`;

const SectionHeader = styled.View`
  background-color: grey;
  height: 50px;
  justify-content: center;
  padding: 0 20px;
`;

const Actions = styled.View`
  align-items: center;
  background-color: red;
  color: white;
  flex-direction: row;
  height: 80px;
  justify-content: flex-end;
  padding: 20px;
`;

const DeleteButton = styled.Text`
  color: white;
`;

const ListSeparator = styled.View`
  background-color: grey;
  height: ${1 / PixelRatio.get()}px;
`;

const renderItem = (item: Item) => {
  const {text} = item;

  return (
    <ListItem>
      <Text>{text}</Text>
    </ListItem>
  );
};

const renderHiddenItem = (onDeleteItem: () => void) => {
  return (
    <TouchableWithoutFeedback onPress={onDeleteItem}>
      <Actions>
        <DeleteButton>Delete</DeleteButton>
      </Actions>
    </TouchableWithoutFeedback>
  );
};

const renderSectionHeader = (section: Section) => {
  const {title} = section;

  return (
    <SectionHeader>
      <Text>{title}</Text>
    </SectionHeader>
  );
};

const categorizeItems = (items: Item[]): Section[] => {
  let lastSection = null;
  let data: Item[] = [];
  const itemsPerSection = [];
  for (let i = 0; i < items.length; i++) {
    const section = items[i].section;
    if (lastSection === null || lastSection === section) {
      data.push(items[i]);
    } else {
      itemsPerSection.push({title: lastSection, data: data});
      data = [items[i]];
    }
    lastSection = section;
  }

  if (lastSection !== null) {
    itemsPerSection.push({title: lastSection, data: data});
  }
  return itemsPerSection;
};

const App = () => {
  const [data, setData] = useState(list);

  const onDeleteItem = (id: string) => {
    setData(data.filter((item) => item.id !== id));
  };

  const categorizedItems: Section[] = categorizeItems(data);

  return (
    <SafeAreaView>
      <SwipeListView<Item>
        useSectionList={true}
        stickySectionHeadersEnabled
        sections={categorizedItems}
        renderItem={({item}) => renderItem(item)}
        renderHiddenItem={({item}) =>
          renderHiddenItem(() => onDeleteItem(item.id))
        }
        renderSectionHeader={({section}) =>
          renderSectionHeader(section as Section)
        }
        ItemSeparatorComponent={ListSeparator}
        keyExtractor={(item) => item.id}
        disableRightSwipe={false}
        rightOpenValue={-113}
      />
    </SafeAreaView>
  );
};

export default App;

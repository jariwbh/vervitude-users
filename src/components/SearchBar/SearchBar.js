import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, SafeAreaView, Dimensions,
    TouchableOpacity, Image, StyleSheet, FlatList
} from 'react-native';
import { TopConsultantViewListService } from '../../services/UserService/UserService';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as SCREEN from '../../context/screen/screenName';
const WIDTH = Dimensions.get('window').width;

const SearchBar = (props) => {
    const [consultant, setConsultant] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    useEffect(() => {
        ConsultantList();
    }, [])

    //Consultant List Service to call function
    const ConsultantList = async () => {
        try {
            const response = await TopConsultantViewListService();
            setFilteredDataSource(response.data);
            setConsultant(response.data);
        } catch (error) {
            console.log(`error`, error);
        }
    }

    //search consultants function
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = consultant.filter(item => {
                const itemData = item.fullname
                    ? item.fullname.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(consultant);
            setSearch(text);
        }
    };

    // Flat List Item
    const ItemView = ({ item }) => {
        return (
            <Text
                style={{ padding: 10 }}
                onPress={() => getItem(item)}>
                {item.id}
                {'.'}
                {item.fullname}
            </Text>
        );
    };

    // Flat List Item Separator
    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    // Function for click on an item
    const getItem = (item) => {
        alert('Id : ' + item.id + ' Title : ' + item.fullname);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.statusbar}>
                <TouchableOpacity >
                    <AntDesign name='search1' size={20} color='#00D9CE' style={{ marginLeft: 20 }} />
                </TouchableOpacity>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder='Search App'
                    type='clear'
                    placeholderTextColor='#999999'
                    returnKeyType='done'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(text) => searchFilterFunction(text)}
                    defaultValue={search}
                />
                <FlatList
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            </View>
        </SafeAreaView>
    )
}

export default SearchBar;

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    statusbar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderColor: '#737373',
        borderRadius: 15,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginTop: 20,
        width: WIDTH - 20,
        height: 45,
        alignItems: 'center',
    },
    textInputStyle: {
        fontSize: 15,
        flex: 1,
        marginLeft: 20,
        alignItems: 'center',
    },
    centerView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
})

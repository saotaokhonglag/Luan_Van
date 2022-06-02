import { View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import React, { useContext, useState } from 'react'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import Background from '../../components/Background'
import Button from '../../components/Button'
import { userContext } from '../../store/GlobalContext'
import { emailValidator } from '../../helpers/emailValidator'
import { nameValidator } from '../../helpers/nameValidator';
import { phoneNumberValidator } from '../../helpers/phoneNumberValidator'
import { db } from '../../../firebase_config'
import { collection, getDoc, doc, setDoc } from 'firebase/firestore'

const { width } = Dimensions.get('window');


const CreateProfile = ({ navigation }) => {
   
    const { userInfo, genders, classs } = useContext(userContext)
    const [name, setName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: 'thaingocro123@gmail.com', error: '' })
    const [phone, setPhone] = useState({ value: '', error: '' })
    const [gender, setGender] = useState();
    
    async function Signup() {
        const nameError = nameValidator(name.value)
        const emailError = emailValidator(email.value)
        const phoneError = phoneNumberValidator(phone.value)
        if (emailError || nameError || phoneError) {
            setName({ ...name, error: nameError })
            setEmail({ ...email, error: emailError })
            setPhone({ ...phone, error: phoneError })
            return
        }
        // Check user account
        const docRef = doc(db, "sinhvien", userInfo.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {

            console.log('Login goole successed!: ', userInfo.id)
        } else {
            // doc.data() will be undefined in this case
            const citiesRef = collection(db, "sinhvien");
            await setDoc(doc(citiesRef, userInfo.id), {
                iduser: userInfo.id,
                hovaten: userInfo.family_name + " " + given_name,
                gioitinh: "",
                ngaysinh: false, population: 860000,
            });
            console.log("No such document!: ", userInfo.id);
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
        })
    }
    return (

        <Background>
            <Header>VUI LÒNG ĐIỀN ĐẦY ĐỦ THÔNG TIN</Header>
            <TextInput
                label="Họ và tên"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                editable={false}
            />
            <TextInput
                label="Số điện thoại"
                returnKeyType="next"
                value={phone.value}
                onChangeText={(text) => setPhone({ value: text, error: '' })}
                error={!!phone.error}
                errorText={phone.error}
                autoCapitalize="none"
                autoCompleteType="tel"
                textContentType="telephoneNumber"
                keyboardType="numeric"
                maxLength={10}
            />
            <SelectDropdown
                data={classs}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                }}
                defaultButtonText={'Chọn lớp học'}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
            />
             <SelectDropdown
                data={genders}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                }}
                defaultButtonText={'Giới tính'}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
            />
            <Button
                mode="contained"
                onPress={Signup}
                style={{ marginTop: 24 }}
            >
                Hoàn tất
            </Button>
        </Background>
    )
}

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        width: '100%',
        height: 55,
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#414757',
        marginVertical: 12,
    },
    dropdown1BtnTxtStyle: { color: '#414757', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#414757', textAlign: 'left' },
})

export default CreateProfile
import React, { Component } from 'react';
import {
    Container, Content, Form, Item, Input, Label, H3,
    Textarea, Radio, Right, Left, Text, ListItem, Button, Picker,
    Icon, Toast, Root, DatePicker
} from 'native-base';
import { StyleSheet, AsyncStorage } from 'react-native';

let allPatients = [];

export default class AddPatient extends Component {
    static navigationOptions = {
        title: 'Add Patient Screen'
    };
    constructor() {
        super();
        this.state = {
            showToast: false,
            patientName: '',
            patientAge: '',
            patientGender: 'male',
            patientDisease: '',
            patientHistory: '',
            date: new Date(),
            idExists: false
        }

        this.initialState = this.state;
    }

    componentDidMount() {
        this.viewPatientList();
    }

    addPatient() {
        let patientData = {};
        if (this.state.idExists) {
            // patientData.patientId = ++(parseInt(patientId));
            console.log("this.state.idExists", this.state.idExists)
        }
        if (!this.state.idExists) {
            patientData.patientId = 1;
            console.log("!this.state.idExists", this.state.idExists)
        }
        patientData = {
            patientName: this.state.patientName,
            patientAge: this.state.patientAge,
            patientGender: this.state.patientGender,
            patientDisease: this.state.patientDisease,
            patientHistory: this.state.patientHistory
        }
        console.log("allPatients", allPatients);
        // allPatients.push(patientData);

        // AsyncStorage.setItem("patientData", JSON.stringify(allPatients)).then(() => {
        //     Toast.show({
        //         text: 'Saved Succesfully',
        //         position: 'bottom',
        //         type: 'success',
        //         duration: 3000,
        //     });
        //     this.setState(this.initialState);
        // })
        console.log("this.state", this.state)
    }

    viewPatientList() {
        allPatients = [];
        let Mydata;
        AsyncStorage.getItem("patientData").then((data) => {
            Mydata = JSON.parse(data);
            console.log("data", Mydata);

            for (var i = 0; i < Mydata.length; i++) {
                allPatients.push(Mydata[i]);
            }
            console.log("allPatients", allPatients);
            var idExists = allPatients.filter(x => x.patientId);
            if (idExists.length > 0) {
                this.setState({ idExists: true })
                console.log("Yes patientId")
            } else if (idExists.length == 0) {
                this.setState({ idExists: false })
                console.log("No patientId")
            }
        })
    }


    render() {
        var { navigate } = this.props.navigation;
        return (
            <Root>

                <Container style={styles.container} >
                    <Content>
                        <Button
                            full
                            onPress={
                                () => navigate("viewPatientList", { name: "Naveed Aheer", website: "naveedaheer.com" })
                            }
                            title='view'
                        ><Text>View Patient</Text></Button>
                        <H3 style={{ textAlign: 'center', marginTop: 10 }} >Add New Patient</H3>
                        <Form {...this.props} style={{ marginTop: -20 }} >
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <Input
                                    {...this.props} //inherit all props of Input like maxLength etc
                                    maxLength={50}
                                    returnKeyType='next'
                                    required
                                    value={this.state.patientName}
                                    onChangeText={(patientName) => this.setState({ patientName })}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Age</Label>
                                <Input keyboardType='numeric'
                                    type='number'
                                    maxLength={2}
                                    returnKeyType='next'
                                    required
                                    value={this.state.patientAge}
                                    onChangeText={(patientAge) => this.setState({ patientAge })}
                                />
                            </Item>

                            <Picker
                                style={{ marginTop: 30, marginLeft: 8 }}
                                mode="dropdown"
                                selectedValue={this.state.patientGender}
                                value={this.state.patientGender}
                                onValueChange={(patientGender) => { this.setState({ patientGender }) }}
                            >
                                <Item label="Male" value="male" />
                                <Item label="Female" value="female" />
                            </Picker>

                            <Item floatingLabel >
                                <Label>Disease</Label>
                                <Input type='text'
                                    {...this.props}
                                    maxLength={30}
                                    returnKeyType='next'
                                    value={this.state.patientDisease}
                                    onChangeText={(patientDisease) => this.setState({ patientDisease })}
                                />
                            </Item>

                            <Item floatingLabel last>
                                <Label >Patient History</Label>
                                <Input
                                    {...this.props} //inherit props of text area
                                    maxLength={50}
                                    returnKeyType='next'
                                    value={this.state.patientHistory}
                                    onChangeText={(patientHistory) => this.setState({ patientHistory })}
                                />
                            </Item>
                            <Button onPress={() => this.addPatient()} full  ><Text> Submit</Text></Button>
                        </Form>
                    </Content>
                </Container>
            </ Root>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});

{/* <DatePicker
                                {...this.props}
                                style={{ width: 200 }}
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate={new Date()}
                                maxDate="2017-12-31"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={(date) => this.setState({ date })}
                            /> */}
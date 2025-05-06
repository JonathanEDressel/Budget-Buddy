import React, { useEffect, useState, } from 'react'
import { Text, Button, Icon, TextInput } from 'react-native-paper';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, 
    ScrollView, Platform, KeyboardAvoidingView, Dimensions  } from 'react-native';
import UserData from '../controllers/UserController';
import UserModel from '../models/UserProfile';
// import { VictoryChart, VictoryTheme, VictoryLine, LineChart } from 'victory-native';
// import LineChart from 'react-native-svg-charts/src/line-chart';
import { LineChart } from 'react-native-chart-kit';

const Projection = () => {
    const [user, setUser] = useState(new UserModel());
    const [chartData, setChartData] = useState([]);

    const chartWidth = Dimensions.get('window').width;
    useEffect(() => {
        const loadData = async () => {
            var data = await UserData.getUserData();
            if(data) {
                setUser(data);
            }
        }
        loadData();
        populateChart();
    }, []);

    useEffect(() => {
        if (user) {
            populateChart();
        }
    }, [user]);

    const dollarToInteger = (data) => {
        var value = data.toString();
        return parseInt(value.replace(/[$,]/g, ''), 10);
    }

    const getMonthlyIncome = () => {
        const PPY = user.PayPerYear;
        const income = dollarToInteger(user.PaycheckIncome);
        console.log('ppy - ', PPY)
        console.log('ppy - ', income)
        return (PPY * income) / 12;
    }

    const getMonthlyContribution = () => {
        var income = getMonthlyIncome();
        console.log('i - ', user.PercentContrib)
        return income * user.PercentContrib;
    }

    const populateChart = () => {
        var d = getMonthlyContribution();
        console.log('d - ', d)
        const PV = dollarToInteger(user.StartingBalance ?? 0);
        const r = parseFloat(user.PreRetireROR ?? 6) / 100;
        var usrAge = parseInt(user.Age);
        var years = parseInt(user.RetirementAge) - parseInt(user.Age);
        if(years < 0)
            years = 0;
        var res = Array.from({ length: years + 1}, (_, n) => ({
            x: usrAge + n,
            y: Math.round((PV) * Math.pow(1 + r, n))
        }));
        const chrtDta = {
            labels: res.map(p => p.x.toString()),
            datasets: [{ data: res.map(p => p.y) }]
        };
        console.log('res - ', chrtDta);
        setChartData(chrtDta);
    };

    const formatCurrency = (value) => {
        const numeric = value.replace(/[^0-9]/g, '');
        if (!numeric) return '';
        const number = parseInt(numeric, 10);
        return `$${number.toLocaleString()}`;
    };

    const formatPercent = (value) => {
        const numeric = value.replace(/[^0-9]/g, '');
        if (!numeric) return '';
        var num = parseInt(numeric, 10);
        var percent = Math.round(num * 100) / 100;
        return `${percent}%`;
    };

    const updateField = (field, value) => {
        const saveUsr = async (usr) => {
        await UserData.saveUserData(usr);
        }

        const updatedUser = { ...user, [field]: value };
        setUser(updatedUser);
        saveUsr(updatedUser);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView>
                <View style={styles.gridContainer}>
                    <View style={styles.titleRow}> 
                        <Text style={styles.title}>401(k) Projection</Text>
                    </View>
                    <View style={styles.userInfoRow}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.profileLbl}>Current Age: </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                            style={styles.profileInput} 
                            value={user.Age}
                            onChangeText={(text) => updateField('Age', text)}
                            keyboardType='numeric'
                            placeholder='40'></TextInput>
                        </View>
                    </View>
                    <View style={styles.userInfoRow}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.profileLbl}>Retirement Age: </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                            style={styles.profileInput} 
                            value={user.RetirementAge}
                            onChangeText={(text) => updateField('RetirementAge', text)}
                            keyboardType='numeric'
                            placeholder='65'></TextInput>
                        </View>
                    </View>
                    <View style={styles.userInfoRow}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.profileLbl}>Income Per Paycheck: </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                            style={styles.profileInput} 
                            value={user.PaycheckIncome}
                            onChangeText={(text) => updateField('PaycheckIncome', formatCurrency(text))}
                            keyboardType='numeric'
                            placeholder='$0'></TextInput>
                        </View>
                    </View>
                    <View style={styles.userInfoRow}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.profileLbl}>Paychecks Per Year: </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                            style={styles.profileInput} 
                            value={user.PayPerYear}
                            onChangeText={(text) => updateField('PayPerYear', text)}
                            keyboardType='numeric'
                            placeholder='12'></TextInput>
                        </View>
                    </View>
                    <View style={styles.userInfoRow}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.profileLbl}>Starting Balance: </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                            style={styles.profileInput} 
                            value={user.StartingBalance}
                            onChangeText={(text) => updateField('StartingBalance', formatCurrency(text))}
                            keyboardType='numeric'
                            placeholder='$0'></TextInput>
                        </View>
                    </View>
                    <View style={styles.userInfoRow}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.profileLbl}>Monthly Contributions: </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                            style={styles.profileInput} 
                            value={user.PercentContrib}
                            onChangeText={(text) => updateField('PercentContrib', formatPercent(text))}
                            keyboardType='numeric'
                            placeholder='6%'></TextInput>
                        </View>
                    </View>
                    <View style={styles.userInfoRow}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.profileLbl}>Estimated Rate of Return: </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                            style={styles.profileInput} 
                            value={user.PreRetireROR}
                            onChangeText={(text) => updateField('PreRetireROR', formatPercent(text))}
                            keyboardType='numeric'
                            placeholder='9%'></TextInput>
                        </View>
                    </View>
                    <View>
                        {chartData && chartData.datasets && (
                        <LineChart
                            data={chartData}
                            width={chartWidth}
                            height={chartWidth/2}
                            yAxisLabel="$"
                            yAxisSuffix=""
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: { borderRadius: 5 },
                                propsForDots: {
                                    r: "3",
                                    // strokeWidth: "1",
                                    stroke: "#ffa726"
                                }
                            }}
                            bezier
                            style={{ marginVertical: 10, borderRadius: 16, alignSelf: 'center' }}
                        />
                    )}
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', 
      justifyContent: 'space-evenly', 
    },
    titleRow: {
      width: '100%',
    },
    title: {
      textAlign: 'center',
      borderBottomWidth: 1,
      fontSize: 35,
    },
    userInfoRow: {
      flexDirection: 'row',
      width: '100%',
      display: 'flex',
      alignContent: 'center',
      borderBottomWidth: 1,
      padding: 15,
    },
    labelContainer: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '51%',
    },
    profileLbl: {
      alignSelf: 'start',
      fontSize: 18,
    },
    inputContainer: {
      height: '100%',
      width: '100%',
    },
    profileInput: {
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: 'white',
      maxWidth: '50%',
      width: '50%',
      height: 25,
    },
  });

export default Projection;
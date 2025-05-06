import React, { useState } from 'react'
import { Text, Button, Icon } from 'react-native-paper';
import { StyleSheet, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';

const Calculator = () => {
  const [equation, setEquation] = useState([]);
  const [equationHistory, setEquationHistory] = useState([]);
  const [calcDisplay, setResult] = useState('0');
  const [toggleHistory, setVisible] = useState(true);

  function clearEquation() {
    setEquation([]);
    setResult('0');
  }

  function removeLast() {
    if(equation.length > 0) {
      var eqstr = equation.join('');
      var res = eqstr.slice(0, -1);
      setResult(res.toString());
      setEquation([res.toString()]);
    }
  }

  function populateHistory(eq, result) {
    var len = equationHistory.length; 
    var item = eq + '=' + result;
    const histItem = { id: len, content: item} 
    const history = [...equationHistory, histItem];
    setEquationHistory(history);
  }

  function calculate() {
    try {
      var eq = equation.join('');
      const res = Number(eval(eq).toFixed(8));
      setResult(res.toString());
      setEquation([res.toString()])

      populateHistory(eq, res);
    }
    catch (e) {
      setEquation([]);
      setResult('Error');
    }
  }

  function buildEquation(data) {
    setEquation((prev) => [...prev, data]);
    setResult(equation.join('') + data)
  }

  return (
    <View>
      <View style={[styles.histroyContainer]}>
        <Button key={'History'} style={[styles.histroyBtn]} onPress={() => setVisible(!toggleHistory)}>
          <Octicons name='history' style={[styles.historyIcon]}/>
        </Button>
      </View>
      <View>
        <View style={[{display: toggleHistory ? 'flex' : 'none'}]}>
          <View  style={[styles.resultContainer]}>
            <Text style={[styles.result]} variant='displayMedium'>{calcDisplay}</Text>
          </View>
          <View style={[styles.gridContainer]}>
            <Button key={'AC'} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button} onPress={() => clearEquation()}>AC</Button>
            <Button key={'remove'} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button} onPress={() => removeLast()}>
              <Ionicons name="arrow-back" size={20} color="black" />
            </Button>
            <Button key={'%'} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button} onPress={() => buildEquation('%')}>%</Button>
            <Button key={'/'} mode='outlined' labelStyle={[styles.buttonLbl]} style={[styles.button, styles.setButton]} onPress={() => buildEquation('/')}>/</Button>

            <Button key={7} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button} onPress={() => buildEquation(7)}>7</Button>
            <Button key={8} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button} onPress={() => buildEquation(8)}>8</Button>
            <Button key={9} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button} onPress={() => buildEquation(9)}>9</Button>
            <Button key={'*'} mode='outlined' labelStyle={[styles.buttonLbl]} style={[styles.button, styles.setButton]} onPress={() => buildEquation('*')}>x</Button>
            <Button key={4} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button} onPress={() => buildEquation(4)}>4</Button>
            <Button key={5} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button} onPress={() => buildEquation(5)}>5</Button>
            <Button key={6} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button} onPress={() => buildEquation(6)}>6</Button>
            <Button key={'-'} mode='outlined' labelStyle={[styles.buttonLbl]} style={[styles.button, styles.setButton]} onPress={() => buildEquation('-')}>-</Button>
            <Button key={1} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button} onPress={() => buildEquation(1)}>1</Button>
            <Button key={2} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button} onPress={() => buildEquation(2)}>2</Button>
            <Button key={3} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button} onPress={() => buildEquation(3)}>3</Button>
            <Button key={'+'} mode='outlined' labelStyle={[styles.buttonLbl]} style={[styles.button, styles.setButton]} onPress={() => buildEquation('+')}>+</Button>

            <Button key={'+/-'} mode='outlined' labelStyle={[styles.buttonLbl]} style={[styles.button]} onPress={() => buildEquation('+/-')}>+/-</Button>
            <Button key={0} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button} onPress={() => buildEquation(0)}>0</Button>
            <Button key={'.'} mode='outlined' labelStyle={[styles.buttonLbl]} style={[styles.button]} onPress={() => buildEquation('.')}>.</Button>
            <Button key={'='} mode='outlined' labelStyle={[styles.buttonLbl]} style={[styles.button, styles.setButton]} onPress={() => calculate()}>=</Button>
          </View>
        </View>
        <View style={[{display: toggleHistory ? 'none' : 'flex'}]}>
          <View style={styles.historyContainer}>
            <FlatList 
              data={equationHistory}
              renderItem={( {item} ) => (
                  
                  <Text style={styles.historyItem}>{item.content}</Text>
              )}
            />
            {/* <ScrollView>
              { equationHistory.map((h, i) => (
                <Text key={i} style={styles.historyList}>
                {i+1}. {h}
                </Text>
              ))}
            </ScrollView> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    histroyContainer: {
      color: 'red',
      height: '10%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '100%',
    },
    histroyBtn: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    historyIcon: {
      fontSize: 20,
    },
    resultContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    result: {
      color: 'black',
      width: '100%',
      paddingRight: '10%',
      textAlign: 'right'
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', 
      justifyContent: 'space-evenly', 
      alignItems: 'center',
      width: '100%',
      padding: 5,
    },
    buttonLbl: {
      color: 'black',
      fontSize: 19,
      fontFamily: 'Times New Roman',
    },
    button: {
      margin: 5,
      width: 75,
      backgroundColor: 'lightgray',
    },
    setButton: {
      backgroundColor: 'orange',
    },
    historyContainer: {
      alignItems: 'center',
      minHeight: '100%',
      padding: '5',
      minWidth: '100%',
    },
    historyItem: {
      width: '300',
      margin: '5',
      textAlign: 'center',
      backgroundColor: 'white',
      fontSize: 28,
      color: 'black',
    },
  });

export default Calculator;
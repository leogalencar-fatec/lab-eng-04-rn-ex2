import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';

import React, { useState } from 'react';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

const minSquares = 8;

export const ScreenContent = ({ title }: ScreenContentProps) => {
  const [decimalInput, setDecimalInput] = useState('');
  const [binaryInput, setBinaryInput] = useState('');
  const [squares, setSquares] = useState<number[]>(Array(minSquares).fill(0));

  const sanitizeNumberInput = (number: string, base: number = 10) => {
    if (base === 10) {
      return number.replace(/[^0-9]/g, '');
    } else if (base === 2) {
      return number.replace(/[^01]/g, '');
    }
    return number;
  };

  const handleDecimalChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = sanitizeNumberInput(e.nativeEvent.text);

    setDecimalInput(value);

    if (value === '' || parseInt(value, 10) <= 0) {
      setBinaryInput('');
      setSquares(Array(minSquares).fill(0));
    } else {
      const binaryValue = parseInt(value, 10)
        .toString(2)
        .padStart(Math.max(minSquares, value.length), '0');

      setBinaryInput(binaryValue);
      setSquares(binaryValue.split('').map(Number));
    }
  };

  const handleBinaryChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = sanitizeNumberInput(e.nativeEvent.text, 2);

    setBinaryInput(value);

    if (value === '' || parseInt(value, 2) <= 0) {
      setDecimalInput('');
      setSquares(Array(minSquares).fill(0));
    } else {
      const decimalValue = parseInt(value, 2).toString();
      setDecimalInput(decimalValue);

      const binaryValue = value.padStart(Math.max(minSquares, value.length), '0');

      setSquares(binaryValue.split('').map(Number));
    }
  };

  return (
    <View className={classes.container}>
      <Text className={classes.title}>{title}</Text>
      <View className={classes.separator} />

      {/* Content */}
      <View className="flex w-full gap-10">
        {/* Form */}
        <View className="flex gap-2">
          <View className="flex flex-row justify-center gap-2">
            <Text>Número em Decimal</Text>
            <TextInput
              className="border"
              inputMode="numeric"
              keyboardType="numeric"
              value={decimalInput}
              onChange={handleDecimalChange}
            />
          </View>
          <View className="flex flex-row justify-center gap-2">
            <Text>Número em Binário</Text>
            <TextInput
              className="border"
              inputMode="numeric"
              keyboardType="numeric"
              value={binaryInput}
              onChange={handleBinaryChange}
            />
          </View>
        </View>

        {/* Table */}
        <View className="overflow-x-auto">
          <View className="w-full">
            {/* Table Header */}
            <View className="flex flex-row">
              {squares.map((square, index) => (
                <View
                  key={index}
                  className="flex-1 border p-2 text-end"
                  style={{
                    minWidth: 4 * squares.length,
                  }}>
                  {Math.pow(2, squares.length - 1 - index)}
                </View>
              ))}
            </View>

            {/* Table Body */}
            <View className="flex flex-row">
              {squares.map((square, index) => (
                <View
                  key={index}
                  className="min-w-12 flex-1 border p-2 text-end"
                  style={{
                    minWidth: 4 * squares.length,
                  }}>
                  {square}
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const classes = {
  container: `items-center flex-1 justify-center max-w-xl mx-auto`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};

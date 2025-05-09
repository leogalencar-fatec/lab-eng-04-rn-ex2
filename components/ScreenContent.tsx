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
  const [inputValue, setInputValue] = useState('');
  const [squares, setSquares] = useState<number[]>(Array(minSquares).fill(0));

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text.replace(/[^0-9]/g, '');

    setInputValue(value);

    if (value === '' || parseInt(value, 10) <= 0) {
      setSquares(Array(minSquares).fill(0));
    } else {
      const binaryValue = parseInt(value, 10)
        .toString(2)
        .padStart(Math.max(minSquares, value.length), '0');
      setSquares(binaryValue.split('').map(Number));
    }
  };

  return (
    <View className={styles.container}>
      <Text className={styles.title}>{title}</Text>
      <View className={styles.separator} />

      {/* Content */}
      <View className="flex w-full gap-10">
        {/* Form */}
        <View>
          <View className="flex flex-row justify-center gap-2">
            <Text>Número</Text>
            <TextInput
              className="border"
              inputMode="numeric"
              keyboardType="numeric"
              value={inputValue}
              onChange={handleChange}
            />
          </View>
        </View>

        {/* Table */}
        <View>
          {/* Table Header */}
          <View className="flex-1 flex-row self-stretch">
            {squares.map((square, index) => (
              <View key={index} className="flex-1 self-stretch border p-2 text-end">
                {Math.pow(2, squares.length - 1 - index)}
              </View>
            ))}
          </View>

          {/* Table Body */}
          <View className="flex-1 flex-row self-stretch">
            {squares.map((square, index) => (
              <View key={index} className="flex-1 self-stretch border p-2 text-end">
                {square}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = {
  container: `items-center flex-1 justify-center max-w-xl mx-auto`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};

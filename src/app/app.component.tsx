import React, { useCallback, useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

import { formatDateTimeUnit } from '~shared/lib';
import { Button, Input, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~shared/ui';

const MONTHS = [
  '1 - Хаммер',
  '2 - Алтуриак',
  '3 - Чес',
  '4 - Тарсак',
  '5 - Миртул',
  '6 - Киторн',
  '7 - Флеймрул',
  '8 - Элесиас',
  '9 - Элейнт',
  '10 - Марпенот',
  '11 - Укта',
  '12 - Найтол',
];

export const App: React.FC = () => {
  const [year, setYear] = useState('0001');
  const [month, setMonth] = useState(MONTHS[0]);
  const [day, setDay] = useState('01');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');

  const incrementYear = useCallback(() => {
    setYear((prevYear) => {
      const parsedYear = parseInt(prevYear);
      const newValue = isNaN(parsedYear) ? 1 : parsedYear + 1;
      return formatDateTimeUnit(newValue, 4);
    });
  }, []);

  const decrementYear = useCallback(() => {
    setYear((prevYear) => {
      const parsedYear = parseInt(prevYear);
      const newValue = isNaN(parsedYear) ? 1 : parsedYear - 1;
      return formatDateTimeUnit(Math.max(newValue, 1), 4);
    });
  }, []);

  const incrementMonth = useCallback(() => {
    setMonth((prevMonth) => {
      const prevMonthIndex = MONTHS.findIndex((monthItem) => monthItem === prevMonth);
      const newIndex = prevMonthIndex + 1;
      if (newIndex >= 12) {
        incrementYear();
      }
      return MONTHS[newIndex % 12];
    });
  }, [incrementYear]);

  const decrementMonth = useCallback(() => {
    setMonth((prevMonth) => {
      const prevMonthIndex = MONTHS.findIndex((monthItem) => monthItem === prevMonth);
      const newIndex = prevMonthIndex - 1;
      if (newIndex >= 12) {
        incrementYear();
      } else if (newIndex < 0) {
        decrementYear();
        return MONTHS[11];
      }
      return MONTHS[newIndex % 12];
    });
  }, [incrementYear, decrementYear]);

  const incrementDay = useCallback(() => {
    setDay((prevDays) => {
      const parsedDay = parseInt(prevDays);
      const newValue = isNaN(parsedDay) ? 1 : parsedDay + 1;
      if (newValue >= 31) {
        incrementMonth();
      }
      return formatDateTimeUnit(newValue % 31);
    });
  }, [incrementMonth]);

  const decrementDay = useCallback(() => {
    setDay((prevDays) => {
      const parsedDay = parseInt(prevDays);
      const newValue = isNaN(parsedDay) ? 1 : parsedDay - 1;
      if (newValue >= 31) {
        incrementMonth();
      } else if (newValue < 1) {
        decrementMonth();
        return formatDateTimeUnit(30);
      }
      return formatDateTimeUnit(newValue % 31);
    });
  }, [incrementMonth, decrementMonth]);

  const incrementHours = useCallback(() => {
    setHours((prevHours) => {
      const parsedHours = parseInt(prevHours);
      const newValue = isNaN(parsedHours) ? 10 : parsedHours + 1;
      if (newValue >= 24) {
        incrementDay();
      }
      return formatDateTimeUnit(newValue % 24);
    });
  }, [incrementDay]);

  const decrementHours = useCallback(() => {
    setHours((prevHours) => {
      const parsedHours = parseInt(prevHours);
      const newValue = isNaN(parsedHours) ? 10 : parsedHours - 1;
      if (newValue >= 24) {
        incrementDay();
      } else if (newValue < 0) {
        decrementDay();
        return formatDateTimeUnit(23);
      }
      return formatDateTimeUnit(newValue % 24);
    });
  }, [incrementDay, decrementDay]);

  const incrementMinutes = useCallback(() => {
    setMinutes((prevMinutes) => {
      const parsedMinutes = parseInt(prevMinutes);
      const newValue = isNaN(parsedMinutes) ? 10 : parsedMinutes + 1;
      if (newValue >= 60) {
        incrementHours();
      }
      return formatDateTimeUnit(newValue % 60);
    });
  }, [incrementHours]);

  const decrementMinutes = useCallback(() => {
    setMinutes((prevMinutes) => {
      const parsedMinutes = parseInt(prevMinutes);
      const newValue = isNaN(parsedMinutes) ? 10 : parsedMinutes - 1;
      if (newValue >= 60) {
        incrementHours();
      } else if (newValue < 0) {
        decrementHours();
        return formatDateTimeUnit(59);
      }
      return formatDateTimeUnit(newValue % 60);
    });
  }, [incrementHours, decrementHours]);

  const handleYearChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value);
    setYear(isNaN(parsedValue) ? event.target.value : formatDateTimeUnit(parsedValue, 4));
  }, []);

  const handleMonthChange = useCallback((newValue: string) => {
    setMonth(newValue);
  }, []);

  const handleDayChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value);
    setDay(isNaN(parsedValue) ? event.target.value : formatDateTimeUnit(parsedValue % 31));
  }, []);

  const handleHoursChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value);
    setHours(isNaN(parsedValue) ? event.target.value : formatDateTimeUnit(parsedValue % 24));
  }, []);

  const handleMinutesChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value);
    setMinutes(isNaN(parsedValue) ? event.target.value : formatDateTimeUnit(parsedValue % 60));
  }, []);

  return (
    <div className="m-auto flex items-center max-md:flex-col max-md:space-y-4 md:space-x-4">
      <div className="flex w-[100px] flex-col space-y-2">
        <Button className="w-full" variant="outline" size="icon" onClick={incrementYear}>
          <ChevronUp className="size-2" />
        </Button>
        <Input className="w-full text-center" value={year} onChange={handleYearChange} type="number" />
        <Button className="w-full" variant="outline" size="icon" onClick={decrementYear}>
          <ChevronDown className="size-2" />
        </Button>
      </div>

      <div className="flex w-[200px] flex-col space-y-2">
        <Button className="w-full" variant="outline" size="icon" onClick={incrementMonth}>
          <ChevronUp className="size-2" />
        </Button>
        <Select value={month} onValueChange={handleMonthChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {MONTHS.map((monthItem) => (
                <SelectItem value={monthItem} key={monthItem}>
                  {monthItem}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="w-full" variant="outline" size="icon" onClick={decrementMonth}>
          <ChevronDown className="size-2" />
        </Button>
      </div>

      <div className="flex w-[60px] flex-col space-y-2">
        <Button className="w-full" variant="outline" size="icon" onClick={incrementDay}>
          <ChevronUp className="size-2" />
        </Button>
        <Input className="w-full text-center" value={day} onChange={handleDayChange} type="number" />
        <Button className="w-full" variant="outline" size="icon" onClick={decrementDay}>
          <ChevronDown className="size-2" />
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex w-[60px] flex-col space-y-2">
          <Button className="w-full" variant="outline" size="icon" onClick={incrementHours}>
            <ChevronUp className="size-2" />
          </Button>
          <Input className="w-full text-center" value={hours} onChange={handleHoursChange} type="number" />
          <Button className="w-full" variant="outline" size="icon" onClick={decrementHours}>
            <ChevronDown className="size-2" />
          </Button>
        </div>

        <span className="h-9 text-xl">:</span>

        <div className="flex w-[60px] flex-col space-y-2">
          <Button className="w-full" variant="outline" size="icon" onClick={incrementMinutes}>
            <ChevronUp className="size-2" />
          </Button>
          <Input className="w-full text-center" value={minutes} onChange={handleMinutesChange} type="number" />
          <Button className="w-full" variant="outline" size="icon" onClick={decrementMinutes}>
            <ChevronDown className="size-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

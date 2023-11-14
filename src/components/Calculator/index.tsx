import { Button, Space, DatePicker, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { useState } from "react";
import * as relativeTime from "dayjs/plugin/relativeTime";
export const Calcultor = () => {
  const [type, setType] = useState(0);
  const [startData, setStartData] = useState("");
  const [endData, setEndData] = useState("");
  const [days, setDays] = useState(0);
  const [calculateType, setCalculateType] = useState(0);
  const [result, setResult] = useState("");

  dayjs.extend(relativeTime);
  dayjs.locale("zh-cn");

  const calculate = () => {
    const start = dayjs(startData);
    const end = dayjs(endData);
    if (type === 0) {
      const result =
        calculateType === 0
          ? start.subtract(days, "days")
          : start.add(days, "days");
      setResult(result.format("YYYY-MM-DD"));
      return;
    }
    setResult(start.to(end, true));
  };
  return (
    <div className="mt-8 w-96">
      <div className="flex justify-center">
        <Space>
          <Button
            onClick={() => {
              setType(0);
              setResult("");
            }}
            className={type === 0 ? "bg-blue-300" : ""}
          >
            日期推算
          </Button>
          <Button
            onClick={() => {
              setType(1);
              setResult("");
            }}
            className={type === 1 ? "bg-blue-300" : ""}
          >
            日期间隔
          </Button>
        </Space>
      </div>
      <div className="mt-6 flex flex-col ">
        <div className="mt-6 flex items-center justify-between rounded-xl py-3 px-2">
          <span>开始日期</span>
          <DatePicker
            onChange={(date, dateString) => setStartData(dateString)}
            placeholder="选择开始日期"
          />
        </div>
        <div
          className={`mt-6 flex items-center justify-between bg-gray-300/50 rounded-xl py-3 px-2 ${
            type === 0 ? "block" : "hidden"
          }`}
        >
          <InputNumber
            placeholder="请输入天数"
            bordered={false}
            value={days}
            min={0}
            onChange={(value) => setDays(Number(value))}
          />
          <Select
            defaultValue={calculateType}
            style={{ width: 100 }}
            bordered={false}
            onChange={setCalculateType}
            options={[
              { value: 0, label: "往前推" },
              { value: 1, label: "往后推" },
            ]}
          />
        </div>
        <div
          className={`mt-6 flex items-center justify-between rounded-xl py-3 px-2 ${
            type === 1 ? "block" : "hidden"
          }`}
        >
          <span>结束日期</span>
          <DatePicker
            onChange={(date, dateString) => {
              setEndData(dateString);
            }}
            placeholder="选择结束日期"
          />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end rounded-xl py-3">
        <Button onClick={calculate} type="primary">
          开始推算
        </Button>
      </div>
      <div>推算结果：{result}</div>
    </div>
  );
};

import { Button, DatePicker, Form, InputNumber, Select, Space } from "antd";
import { Dayjs } from "dayjs";
import { useState } from "react";
import locale from "antd/es/date-picker/locale/zh_CN";

type FormType = {
  startDate: Dayjs;
  endDate: Dayjs;
  days: number;
  calculateType: 0 | 1;
};

export const Calculator = () => {
  const [result, setResult] = useState("");
  const [type, setType] = useState(0);

  const onFinish = (values: FormType) => {
    const { startDate, calculateType, days, endDate } = values;

    if (type === 0) {
      const result =
        calculateType === 0
          ? startDate.subtract(days, "days")
          : startDate.add(days, "days");

      setResult(result.format("YYYY-MM-DD"));
      return;
    }

    setResult(startDate.to(endDate, true));
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
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, marginTop: 50 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="开始日期"
          name="startDate"
          rules={[{ required: true, message: "请选择开始日期" }]}
        >
          <DatePicker locale={locale} />
        </Form.Item>
        {type === 0 ? (
          <div>
            <Form.Item label="前后推算" name="calculateType" initialValue={0}>
              <Select
                style={{ maxWidth: 100 }}
                options={[
                  { value: 0, label: "往前推" },
                  { value: 1, label: "往后推" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="天数"
              name="days"
              rules={[{ required: true, message: "请填写日期" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </div>
        ) : (
          <Form.Item
            label="结束日期"
            name="endDate"
            rules={[{ required: true, message: "请选择结束日期" }]}
          >
            <DatePicker locale={locale} />
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            开始推算
          </Button>
        </Form.Item>
      </Form>
      <div className=" ml-12">推算结果：{result}</div>
    </div>
  );
};

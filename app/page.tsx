"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, DatePickerProps, FloatButton, Typography } from "antd";
import CarouselComponent from "./components/CarouselComponent";
import CollapseComponent from "./components/CollapseComponent";
import { UpOutlined } from "@ant-design/icons";
import GridComponent from "./components/GridComponent";
import { DatePicker, Space } from "antd";
import { Dayjs } from "dayjs";

const getYearMonth = (date: Dayjs) => date.year() * 12 + date.month();

export default function Home() {
  const queryClient = useQueryClient();

  const { data, isError, isLoading, isFetched } = useQuery<any>({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/posts");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (newTodo: { title: string; body: string }) => {
      const res = await fetch("http://localhost:3001/posts", {
        method: "POST",
        body: JSON.stringify({
          title: newTodo.title,
          body: newTodo.body,
          id: data.length + 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log("date changed", date?.month(), dateString);
  };
  const disabled7DaysDate: DatePickerProps["disabledDate"] = (
    current,
    { from, type }
  ) => {
    if (from) {
      const minDate = from.add(-6, "days");
      const maxDate = from.add(6, "days");

      switch (type) {
        case "year":
          return (
            current.year() < minDate.year() || current.year() > maxDate.year()
          );

        case "month":
          return (
            getYearMonth(current) < getYearMonth(minDate) ||
            getYearMonth(current) > getYearMonth(maxDate)
          );

        default:
          return Math.abs(current.diff(from, "days")) >= 7;
      }
    }

    return false;
  };

  console.log("Loading: ", isLoading);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isFetched) console.log("fetched");

  return (
    <main className="mt-6">
      <div>
        {/* carousel */}
        <CarouselComponent />

        <Typography.Title level={2}>Welcome</Typography.Title>
        <Typography.Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
          officia quia, excepturi voluptatum hic, veritatis minus odio error
          libero dolor magnam pariatur saepe officiis repellendus? Ipsa quaerat
          aliquid consequuntur harum.
        </Typography.Paragraph>
      </div>
      <hr />
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <Button
        type="dashed"
        onClick={() => mutation.mutate({ title: "foo", body: "bar" })}
      >
        Add todo
      </Button>
      <hr />
      {/* collapse */}
      <div className="mt-6">
        <Typography.Title level={2}>FAQs</Typography.Title>
        <CollapseComponent />
      </div>
      {/* practice grid */}
      <GridComponent />
      {/* datepicker  */}
      <Space direction="horizontal">
        <DatePicker placement="bottomRight" onChange={handleDateChange} />
        <DatePicker onChange={handleDateChange} picker="week" />
        <DatePicker onChange={handleDateChange} picker="month" />
        <DatePicker onChange={handleDateChange} picker="quarter" />
        <DatePicker onChange={handleDateChange} picker="year" />
        <Typography.Title level={5}>7 days range</Typography.Title>
        <DatePicker.RangePicker disabledDate={disabled7DaysDate} />
      </Space>

      <div className="mb-40">{/* extra space for float button */}</div>
      <FloatButton.BackTop
        icon={<UpOutlined className="text-white" />}
        className="hover:bg-orange-600 hover:border-none"
      />
    </main>
  );
}

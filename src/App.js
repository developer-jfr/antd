import React, { useState } from "react";
import { Button, Card, Select, Space } from "antd";

import "./styles.css";
import "antd/dist/antd.css";
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

export default function App() {
  const { Option } = Select;
  const [augmentations, setAugmentations] = useState([
    {
      subType: "Japan",
      type: "country",
      color: "red"
    }
  ]);

  console.log(augmentations);
  const [augmentationType, setAugmentationType] = useState("");

  const seriesColorMap = [
    "blue",
    "green",
    "red",
    "orange",
    "purple",
    "pink",
    "black"
  ];
  const taxonomyGroups = {
    unit: [
      { value: "Text 1" },
      { value: "Text 2" },
      { value: "Text 3" },
      { value: "Text 4" }
    ],
    status: [{ value: "0" }, { value: "1" }],
    country: [{ value: "India" }, { value: "Australia" }, { value: "Japan" }]
  };

  const onAddAugmentation = () => {
    setAugmentations((current) => {
      return [
        ...current,
        {
          color: seriesColorMap[current.length]
        }
      ];
    });
  };
  const onRemoveAugmentation = (index) => {
    setAugmentations((current) => {
      if (index > -1) {
        current.splice(index, 1);
      }
      console.log(augmentations);
      return [...current];
    });
  };

  return (
    <Card title="Augmentations">
      {augmentations.map((augmentation, index) => (
        <>
          <Select
            value={augmentation.type}
            onChange={(data) => {
              augmentation.type = data;
              augmentation.subType = "";
              setAugmentationType(data);
            }}
            dropdownStyle={{ zIndex: 2000 }}
            style={{ width: 200 }}
            placeholder="Select a type"
          >
            {Object.keys(taxonomyGroups).map((item, index) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Space>
            <Select
              defaultValue={augmentation.subType}
              onChange={(demographic) => {
                augmentation.subType = demographic;
              }}
              onDropdownVisibleChange={() => {
                setAugmentationType(augmentation.type);
              }}
              dropdownStyle={{ zIndex: 2000 }}
              style={{ width: 200, paddingTop: 10 }}
              placeholder="Select a sub type"
            >
              {augmentationType.length !== 0 &&
                taxonomyGroups[augmentationType].map((demographic, idx) => (
                  <Option key={demographic.value} value={demographic.value}>
                    {demographic.value}
                  </Option>
                ))}
            </Select>
            <Button type="danger" onClick={() => onRemoveAugmentation(index)}>
              <CloseCircleOutlined />
            </Button>
          </Space>
        </>
      ))}
      {augmentations.length < seriesColorMap.length && (
        <div style={{ textAlign: "center" }}>
          <Button onClick={onAddAugmentation}>
            <PlusCircleOutlined />
          </Button>
        </div>
      )}
    </Card>
  );
}

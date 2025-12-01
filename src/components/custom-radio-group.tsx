import { Card, CardBody, CardFooter, CardHeader, Divider, RadioGroup, Textarea } from "@heroui/react";

import { Radio, cn } from "@heroui/react";
import { useCallback, useState } from "react";

function CustomRadio(props: any) {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export default function CustomRadioGroup() {
  const [vote, setVote] = useState<string>("");

  const castVote = useCallback((vote: string) => {
    if (!vote) return;
    setVote(`35202-1234567-1|${vote}|${new Date().toISOString()}`);
  }, [setVote]);
  return (
      <Card className="w-full">
        <CardHeader className="text-xl justify-center text-center">
          NA-131 Lahore-IX
        </CardHeader>
        <Divider />
        <CardBody>
          <RadioGroup
          onValueChange={(value) => castVote(value)}
           className="items-center" classNames={{ label: "text-lg my-4 text-black", }} label="Who is the best choice for Prime Minister of Pakistan?">
            <CustomRadio description="Pakistan Tehreek-e-Insaf" value="imran-ahmed-khan-niazi">
              Imran Ahmad Khan Niazi
            </CustomRadio>
            <CustomRadio description="Pakistan Muslim League (N)" value="mian-muhammad-nawaz-sharif">
              Mian Muhammad Nawaz Sharif
            </CustomRadio>
            <CustomRadio description="Pakistan Peoples Party" value="asif-ali-zardari">
              Asif Ali Zardari
            </CustomRadio>
          </RadioGroup>
        </CardBody>
        <Divider />
        <CardFooter className="text-sm justify-center text-center">
        <Textarea
          value={vote}
          disabled
          placeholder="Click on your desired candidate above to see your selected vote here."
          rows={4}
          className="font-mono text-sm"
        />
        </CardFooter>
      </Card>
  );
}

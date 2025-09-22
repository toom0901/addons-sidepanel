import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import cx from "classnames";
import WarningIcon from "@/assets/icon-warning.png";
import ErrorIcon from "@/assets/icon-error.png";
import MutedIcon from "@/assets/icon-muted.png";
import Image from "next/image";
import { Button } from "./ui/button";
import { CheckCheck, Hourglass, X } from "lucide-react";

export type NotiData = {
  userName: string;
  time: string;
  message: string;
};

export type NotiHistory = {
  type: "warning" | "error" | "muted";
  data?: NotiData;
};

export type DialogProps = {
  color: "warning" | "error" | "muted";
  index: number;
  isResolved?: boolean;
  data?: NotiHistory;
  accept?: (id: number) => void;
  reject?: (id: number) => void;
  suspend?: (id: number) => void;
};

const DialogComponent = (props: DialogProps) => {
  return (
    <div className="cs-show-animate fixed inset-0 flex items-center justify-center bg-gray-500/20">
      <Card
        className={cx("cs-fade-in-animate max-w-87.5 rounded-2xl mx-auto border-2 gap-2 p-10", {
          "border-cs-warning": props.color === "warning",
          "border-cs-error": props.color === "error",
          "border-cs-muted": props.color === "muted",
          "bg-radial-[46.58%_18.53%_at_50%_16.48%] from-cs-warning/20 to-white/20 to-90%":
            props.color === "warning",
          "bg-radial-[46.58%_18.53%_at_50%_16.48%] from-cs-error/20 to-white/20 to-90%":
            props.color === "error",
          "bg-radial-[46.58%_18.53%_at_50%_16.48%] from-cs-muted/20 to-white/20 to-90%":
            props.color === "muted",
        })}
      >
        <CardHeader className="text-center">
          <div className="">
            <div className="flex justify-center">
              <Image
                src={
                  props.color === "warning"
                    ? WarningIcon
                    : props.color === "error"
                    ? ErrorIcon
                    : MutedIcon
                }
                alt="Dialog icon"
                className=""
              />
            </div>
            <CardTitle
              className={cx("text-2xl", {
                "text-cs-warning": props.color === "warning",
                "text-cs-error": props.color === "error",
                "text-cs-muted": props.color === "muted",
              })}
            >
              Warning
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-center px-0">
          <CardDescription>
            <div className="text-gray-800 text-lg font-semibold mb-1">
              Please mind your language
            </div>
            <div className="text-gray-800 text-base px-4">
              The language you used may contain content that violates our
              community guidelines. Please be careful to maintain a professional
              and respectful environment.
            </div>
          </CardDescription>
        </CardContent>
        <CardFooter className="flex-col gap-4 mt-5 px-0">
          <Button
            disabled={props.isResolved}
            className="w-full gap-2 rounded-full bg-white text-base text-gray-800 hover:bg-gray-800/10 border border-gray-800"
            size="xl"
            onClick={() => props.accept?.(props.index)}
          >
            <CheckCheck className="text-green-500" size={20} />
            Valid
          </Button>
          <Button
            disabled={props.isResolved}
            className="w-full gap-2 rounded-full bg-white text-base text-gray-800 hover:bg-gray-800/10 border border-gray-800"
            size="xl"
            onClick={() => props.reject?.(props.index)}
          >
            {" "}
            <X className="text-cs-error" size={20} />
            False positive
          </Button>
          <Button
            disabled={props.isResolved}
            className="w-full gap-2 rounded-full bg-white text-base text-gray-800 hover:bg-gray-800/10 border border-gray-800"
            size="xl"
            onClick={() => props.suspend?.(props.index)}
          >
            {" "}
            <Hourglass className="text-cs-muted" size={20} />
            Suspend
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DialogComponent;

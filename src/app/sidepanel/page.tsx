"use client";

import { useEffect, useRef, useState } from "react";
import {
  meet,
  MeetSidePanelClient,
} from "@googleworkspace/meet-addons/meet.addons";
import {
  ACTIVITY_SIDE_PANEL_URL,
  CLOUD_PROJECT_NUMBER,
  MAIN_STAGE_URL,
} from "@/shared/constants";
import { Button } from "@/components/ui/button";
import DialogComponent, { NotiHistory } from "@/components/Dialog";
import dayjs from "dayjs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Page() {
  const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient>();
  const [isConnected, setIsConnected] = useState(false);
  const [notiHistory, setNotiHistory] = useState<NotiHistory[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    const wsUrl = "ws://localhost:8080";

    try {
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        setIsConnected(true);
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data: NotiHistory = {
            type: "warning",
            data: JSON.parse(event.data),
          };
          setNotiHistory((prev) => [...prev, data]);
        } catch (error) {
          console.error(error);
        }
      };

      wsRef.current.onclose = () => {
        setIsConnected(false);
      };

      wsRef.current.onerror = (error) => {
        console.error("[v0] WebSocket error:", error);
      };
    } catch (error) {
      console.error("[v0] Failed to connect:", error);
    }
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.send(
        JSON.stringify({
          type: "leave",
          timestamp: new Date().toISOString(),
        })
      );
      wsRef.current.close(1000, "User disconnected");
    }
    setNotiHistory([]);
  };

  // const sendMessage = () => {
  //   const messageData = {
  //     type: "message",
  //     id: Date.now().toString(),
  //     timestamp: new Date().toISOString(),
  //   };
  //   wsRef.current?.send(JSON.stringify(messageData));
  // };

  // async function startCollaboration(e: unknown) {
  //   if (!sidePanelClient) {
  //     throw new Error("Side Panel is not yet initialized!");
  //   }

  //   const startingColor = (
  //     document.getElementById("starting-color")! as HTMLInputElement
  //   ).value;
  //   await sidePanelClient.startActivity({
  //     mainStageUrl: MAIN_STAGE_URL,
  //     sidePanelUrl: ACTIVITY_SIDE_PANEL_URL,
  //     additionalData: `{\"startingColor\": \"${startingColor}\"}`,
  //   });
  //   window.location.replace(ACTIVITY_SIDE_PANEL_URL + window.location.search);
  // }

  useEffect(() => {
    async function initializeSidePanelClient() {
      const session = await meet.addon.createAddonSession({
        cloudProjectNumber: CLOUD_PROJECT_NUMBER,
      });

      const client = await session.createSidePanelClient();
      const info = await client.getMeetingInfo();
      console.log(info);
      setSidePanelClient(client);
    }
    initializeSidePanelClient();
    connectWebSocket();
  }, []);

  const [latestNotification, setLatestNotiication] =
    useState<NotiHistory | null>(null);
  const [dialogIndex, setDialogIndex] = useState<number>(-1);
  const [isOpenNotification, setIsOpenNotiication] = useState(false);
  const handleAccept = (id: number) => {
    console.log(id);
    setIsOpenNotiication(false);
    document.body.classList.remove("overflow-hidden");
  };
  const handleReject = (id: number) => {
    console.log(id);
    setIsOpenNotiication(false);
    document.body.classList.remove("overflow-hidden");
  };
  const handleSuspend = (id: number) => {
    console.log(id);
    setIsOpenNotiication(false);
    document.body.classList.remove("overflow-hidden");
  };

  const handleOpenDialog = (id: number) => {
    setIsOpenNotiication(true);
    setDialogIndex(id)
    setLatestNotiication(notiHistory[id]);
    document.body.classList.add("overflow-hidden");
  };

  return (
    <div className="min-h-screen">
      {isOpenNotification && latestNotification ? (
        <DialogComponent
          color={"warning"}
          index={dialogIndex}
          data={latestNotification}
          accept={handleAccept}
          reject={handleReject}
          suspend={handleSuspend}
        />
      ) : null}
      <div className="h-full space-y-4 p-4">
        {notiHistory.length === 0 ? (
          <div className="h-full flex items-center text-center text-muted-foreground py-8">
            {isConnected
              ? "There are currently no announcements."
              : "Conference Inspection addons is stop!"}
          </div>
        ) : (
          notiHistory.map((noti, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className="space-y-1 rounded-md hover:bg-gray-800/10 p-3 mb-0"
                  onClick={() => handleOpenDialog(index)}
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium">{noti.data?.userName}</span>{" "}
                    <span>{dayjs(noti.data?.time).format("hh:mm")}</span>
                  </div>
                  <div className="rounded-lg text-sm">{noti.data?.message}</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div>Click to view more actions.</div>
              </TooltipContent>
            </Tooltip>
          ))
        )}
      </div>
    </div>
  );
}

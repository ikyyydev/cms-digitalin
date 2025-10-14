"use client";

import { Copy, Server } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { VariantProps } from "class-variance-authority";
import { Button } from "./button";
import { toast } from "sonner";
import { HiCheckCircle } from "react-icons/hi";

interface APiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const textMap: Record<APiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<APiAlertProps["variant"], BadgeVariant> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<APiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to clipboard", {
      icon: <HiCheckCircle size={24} className="text-green-600" />,
      style: { backgroundColor: "#dcfce7", color: "#166534" },
    });
  };
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}

        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-sm font-semibold font-mono">
          {description}
        </code>
        <Button variant={"outline"} size={"icon"} onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

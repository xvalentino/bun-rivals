import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRef, useState, type FormEvent } from "react";
import { z } from "zod";

// Define the response type schema
const ApiResponseSchema = z.object({
  ok: z.boolean().optional(),
  data: z.unknown().optional(),
  error: z.string().optional(),
}).or(z.array(z.unknown())).or(z.record(z.unknown()));

type ApiResponse = z.infer<typeof ApiResponseSchema>;

// Define HTTP method type
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export function APITester() {
  const responseTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const testEndpoint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const endpoint = formData.get("endpoint") as string;
      const method = formData.get("method") as HttpMethod;
      
      if (!endpoint || !method) {
        throw new Error("Endpoint and method are required");
      }

      const url = new URL(endpoint, location.href);
      const res = await fetch(url, { method });

      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }

      const data = await res.json();
      
      // Validate with Zod
      const result = ApiResponseSchema.safeParse(data);
      
      if (!result.success) {
        console.warn("Response validation warning:", result.error);
      }
      
      // Display response
      if (responseTextareaRef.current) {
        responseTextareaRef.current.value = JSON.stringify(data, null, 2);
      }
    } catch (error) {
      console.error("API test error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
      if (responseTextareaRef.current) {
        responseTextareaRef.current.value = errorMessage || "Error occurred";
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 mx-auto w-full max-w-2xl text-left flex flex-col gap-4">
      <form
        onSubmit={testEndpoint}
        className="flex items-center gap-2 bg-card p-3 rounded-xl font-mono border border-input w-full"
      >
        <Select name="method" defaultValue="GET">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          name="endpoint"
          defaultValue="/api/heroes"
          className={cn(
            "flex-1 font-mono",
            "bg-transparent border-0 shadow-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
          placeholder="/api/heroes"
        />

        <Button type="submit" variant="secondary" disabled={isLoading}>
          {isLoading ? "Loading..." : "Send"}
        </Button>
      </form>

      {errorMessage && (
        <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
      )}

      <textarea
        ref={responseTextareaRef}
        readOnly
        placeholder="Response will appear here..."
        className={cn(
          "w-full min-h-[140px] bg-card",
          "border border-input rounded-xl p-3",
          "font-mono resize-y",
          "placeholder:text-muted-foreground",
        )}
      />
    </div>
  );
}

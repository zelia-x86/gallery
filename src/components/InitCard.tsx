'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
	CardFooter,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FloatBox from "@/components/Floatbox";

import { useSearchParams } from "next/navigation";
import Form from "next/form"


export default function InitCard () {
  return (
    <FloatBox>
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="content-center" >Gallery</CardTitle>
          <CardDescription>
            Easily organize your gallery.
          </CardDescription>
        </CardHeader>
        <Form className="grid gap-2" action="/gallery" >
          <CardContent className="grid gap-2">
            <Label>Link</Label>
            <Input type="url" name="link" placeholder="https://gallery.com"
              defaultValue={decodeURIComponent(useSearchParams().get("link") ?? "")} required />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Open</Button>
          </CardFooter>
        </Form>
      </Card>
    </FloatBox>
  )
}
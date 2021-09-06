import axios from "axios";
import { IncomingLinearWebhookPayload } from "../types";

export function POST(body: Record<string, any>, url: string = process.env.WEBHOOK!) {
  return axios.post(url, body)
}

/**
 * Get the task ID from url
 * @param link task url
 */
export function getId(link: string) {
  return link.split('/')[5];
}

/**
 * Formats and prettifies label(s)
 * @param labels connected labels
 */
export function prettifyLabels(labels: NonNullable<IncomingLinearWebhookPayload['data']['labels']>) {
  if (!labels) {
    return ''
  }

  return labels.map((label) => label.name).join(', ');
}
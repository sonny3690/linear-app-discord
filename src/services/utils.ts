import { IncomingLinearWebhookPayload } from "../types";


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
  return labels.map((label) => label.name).join(', ');
}
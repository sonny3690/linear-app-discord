import { IncomingLinearWebhookPayload, IssueCache } from "src/types";
import { getId, POST } from "./utils";
export namespace Issue {

  const issueCache: IssueCache = {}

  function describeIssue(payload: IncomingLinearWebhookPayload, authorName: string) {
    return ({
      color: 0x4752b2,
      author: {
        name: authorName
      },
      title: `[${getId(payload.url)}] ${payload.data.title}`,
      url: payload.url,
      fields: generateFields(payload),
      timestamp: new Date(),
      footer: {
        text: `Linear App`,
        icon_url: 'https://pbs.twimg.com/profile_images/1121592030449168385/MF6whgy1_400x400.png',
      },
    })
  }


  function generateFields(payload: IncomingLinearWebhookPayload) {
    return [
      {
        name: 'Priority',
        value: getPriorityValue(payload.data.priority ?? 0),
        inline: true,
      },
      {
        name: 'Estimate',
        value: payload.data.estimate ?? 'None',
        inline: true,
      },
      {
        name: 'Status',
        value: payload.data.state?.name,
        inline: false,
      },
    ]
  }

  // monitors if issue was created or if there was a status change 
  function isIssueAlreadyCached(payload: IncomingLinearWebhookPayload) {
    // worth writing tests for some of these util functions but defer since it's not user facing
    const url = payload.url
    const status = payload.data.state?.name as string

    if (url in issueCache) {
      if (status === issueCache[url]) {
        return true
      }
    }

    issueCache[url] = status
    return false
  }



  export function newIssue(payload: IncomingLinearWebhookPayload) {

    if (isIssueAlreadyCached(payload)) {
      return
    }

    const res = POST(
      {
        embeds: [
          describeIssue(payload, 'Created Issue')
        ],
      }
    )
    return res
  }


  export function modifyIssue(payload: IncomingLinearWebhookPayload) {

    if (isIssueAlreadyCached(payload)) {
      return
    }

    const res = POST(
      {
        embeds: [
          describeIssue(payload, 'Modified Issue')
        ],
      }
    )
    return res
  }


  /**
   * Get the Priority Value translated
   * @param priority number for priority
   */
  function getPriorityValue(priority: NonNullable<IncomingLinearWebhookPayload['data']['priority']>) {
    switch (priority) {
      case 0:
        return 'None';
      case 1:
        return 'Urgent';
      case 2:
        return 'High';
      case 3:
        return 'Medium';
      case 4:
        return 'Low';
    }
  }


}
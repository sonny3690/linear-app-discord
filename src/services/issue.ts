import { IncomingLinearWebhookPayload } from "src/types";
import { getId, POST } from "./utils";
export namespace Issue {

  export function newIssue(payload: IncomingLinearWebhookPayload) {
    console.log('payload', payload)

    POST({
      embeds: [
        {
          color: 0x4752b2,
          author: {
            name: `Issue Created [${getId(payload.url)}]`,
          },
        }
      ]
    })

    // {
    //   embeds: [
    //     {
    //       color: 0x4752b2,
    //       author: {
    //         name: `Issue Created [${getId(payload.url)}]`,
    //       },
    //       title: payload.data.title,
    //       url: payload.url,
    //       fields: [
    //         {
    //           name: 'Priority',
    //           value: getPriorityValue(payload.data.priority ?? 0),
    //           inline: true,
    //         },
    //         {
    //           name: 'Points',
    //           value: payload.data.estimate,
    //           inline: true,
    //         },
    //         {
    //           name: 'Labels',
    //           value: prettifyLabels(payload.data.labels!),
    //           inline: false,
    //         },
    //       ],
    //       timestamp: new Date(),
    //       footer: {
    //         text: `Linear App`,
    //         icon_url: 'https://pbs.twimg.com/profile_images/1121592030449168385/MF6whgy1_400x400.png',
    //       },
    //     },
    //   ],
    // }
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
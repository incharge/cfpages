import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
    try {
        const msg = createMimeMessage();
        msg.setSender({ name: "GPT-4", addr: "sender@knownas.co.uk" });
        msg.setRecipient("cloudflare@incharge.co.uk");
        msg.setSubject("An email generated in a worker");
        msg.addMessage({
            contentType: "text/plain",
            data: `Congratulations, you just sent an email from a worker.`,
        });

        var message = new EmailMessage(
            "sender@knownas.co.uk",
            "cloudflare@incharge.co.uk",
            msg.asRaw(),
        );

        await context.env.SEB.send(message);
    } catch (e) {
      return new Response(e.message);
    }

  try {
    let input = await context.request.formData();
    let pretty = JSON.stringify([...input], null, 2);
    return new Response(pretty, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  } catch (err) {
    return new Response("Error parsing JSON content", { status: 400 });
  }
}
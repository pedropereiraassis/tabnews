import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import activation from "models/activation.js";

const router = createRouter();

router.patch(patchHandler);

export default router.handler(controller.errorHandlers);

async function patchHandler(request, response) {
  const rawTokenId = Array.isArray(request.query.token_id)
    ? request.query.token_id[0]
    : request.query.token_id;
  const activationTokenId =
    String(rawTokenId).match(/[0-9a-fA-F-]{36}/)?.[0] ?? rawTokenId;

  const validActivationToken = await activation.findOneValidById(activationTokenId);
  const usedActivationToken = await activation.markTokenAsUsed(validActivationToken.id);

  await activation.activateUserByUserId(usedActivationToken.user_id);

  return response.status(200).json(usedActivationToken);
}

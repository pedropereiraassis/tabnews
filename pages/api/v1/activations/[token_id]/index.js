import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import activation from "models/activation.js";

const router = createRouter();

router.use(controller.injectAnonymousOrUser);
router.patch(controller.canRequest("read:activation_token"), patchHandler);

export default router.handler(controller.errorHandlers);

async function patchHandler(request, response) {
  const rawTokenId = Array.isArray(request.query.token_id)
    ? request.query.token_id[0]
    : request.query.token_id;
  const activationTokenId =
    String(rawTokenId).match(/[0-9a-fA-F-]{36}/)?.[0] ?? rawTokenId;

  const validActivationToken = await activation.findOneValidById(activationTokenId);

  await activation.activateUserByUserId(validActivationToken.user_id);

  const usedActivationToken =
    await activation.markTokenAsUsed(activationTokenId);

  return response.status(200).json(usedActivationToken);
}

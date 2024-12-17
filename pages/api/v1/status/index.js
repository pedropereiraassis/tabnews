function status(request, response) {
  response.status(200).json({ status: 'somos acima da média' });
}

export default status;
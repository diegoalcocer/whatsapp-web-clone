const messageController = require('../../controllers/messageController');
const Message = require('../../models/Message');

// Mocking Message model
jest.mock('../../models/Message', () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue(true),
    };
  });
});

describe('messageController', () => {
  let req, res;

  beforeEach(() => {
    // Mock request and response
    req = {
      body: {
        chatId: '123',
        senderId: '456',
        content: 'Test message',
        type: 'text'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('createMessage - success', async () => {
    await messageController.createMessage(req, res);

    expect(Message).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.anything());
  });


});

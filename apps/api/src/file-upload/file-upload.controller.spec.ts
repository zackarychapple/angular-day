import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadController } from './file-upload.controller';

describe('FileUpload Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FileUploadController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: FileUploadController = module.get<FileUploadController>(FileUploadController);
    expect(controller).toBeDefined();
  });
});

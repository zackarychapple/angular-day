import {Controller, FileInterceptor, FilesInterceptor, HttpStatus, Post, UploadedFile, UploadedFiles, UseInterceptors} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import {ApiConsumes, ApiImplicitFile, ApiOperation, ApiResponse} from '@nestjs/swagger';

@Controller('file-upload')
export class FileUploadController {
  @Post('single')
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({name: 'file', required: true, description: 'User Uploaded File'})
  @ApiResponse({status: HttpStatus.ACCEPTED, description: 'The File has been saved'})
  @ApiOperation({title: 'Uploads file to the server'})
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    fs.createWriteStream(path.join(`static_files/${file.originalname}`));
    return HttpStatus.ACCEPTED;
  }

  @Post('multiple')
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({name: 'file upload', required: true, description: 'User Uploaded File'})
  @ApiResponse({status: HttpStatus.ACCEPTED, description: 'The Files have been saved'})
  @ApiOperation({title: 'Uploads multiple files to the server'})
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@UploadedFiles() files) {
    // TODO: This should handle duplicate file errors
    files.forEach((file) => {
      fs.createWriteStream(path.join(`static_files/${file.originalname}`));
    });
    return HttpStatus.ACCEPTED;
  }
}

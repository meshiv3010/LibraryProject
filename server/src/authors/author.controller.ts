import { Controller, Get, Param, Delete, Put, Body} from '@nestjs/common';
import { AuthorService } from './authors.service';
import { Types } from 'mongoose';
import { Book } from 'src/books/book.schema';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Get()
    findAll() {
        return this.authorService.getAllAuthors();
    }

    @Get(':id/books')
    findBooksByAuthor(@Param('id') id: Types.ObjectId): Promise<Types.ObjectId[]> {
        return this.authorService.getBooksByAuthor(id);
    }
    
    @Get('nameAndNumner')
    getAllAuthorsNameWithNumber() {
        return this.authorService.getAllAuthorsNameWithNumber();
    }
    @Delete(':id')
    async deleteAuthor(@Param('id') id: Types.ObjectId): Promise<{ message: string }> {
      await this.authorService.deleteAuthor(id);
      return { message: 'User has been successfully deleted' };
    }

    @Put(':id')
    updateAuthor(
      @Param('id') id: Types.ObjectId,
      @Body() updateAuthorDto: UpdateAuthorDto
    ) {
      return this.authorService.updateAuthor(id, updateAuthorDto);
    }
}

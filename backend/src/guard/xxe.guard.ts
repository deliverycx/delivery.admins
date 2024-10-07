import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from 'express';

@Injectable()
export class XmlGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		if (request.body._id) {
			const xml = request.body._id;

			// Проверка на наличие DTD и внешних сущностей

			if (xml.includes('<!DOCTYPE') || xml.includes('select extractvalue')) {
				return false; // блокируем запрос
			}
		}


		return true; // разрешаем запрос
	}
}



@Injectable()
export class SqlInjectionGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request: Request = context.switchToHttp().getRequest<Request>();

		// Теперь корректно получаем параметры, тело и строку запроса
		const suspiciousPatterns = ['extractvalue', 'xmltype', '<!DOCTYPE'];

		// Проверяем параметры маршрута, тело запроса и строку запроса
		const queryValues = [
			...Object.values(request.params),  // Параметры URL
			...Object.values(request.body),    // Тело запроса
			...Object.values(request.query)    // Строка запроса
		];

		for (const value of queryValues) {
			if (typeof value === 'string' && suspiciousPatterns.some(p => value.includes(p))) {
				return false; // Блокируем запрос при обнаружении подозрительных паттернов
			}
		}

		return true;
	}
}
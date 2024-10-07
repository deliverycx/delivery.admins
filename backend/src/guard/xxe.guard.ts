import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class XmlGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const xml = request.body._id;

		// Проверка на наличие DTD и внешних сущностей

		if (xml.includes('<!DOCTYPE') || xml.includes('select extractvalue')) {
			return false; // блокируем запрос
		}

		return true; // разрешаем запрос
	}
}

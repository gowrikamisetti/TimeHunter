import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'projectSearch' })
export class projectSearch implements PipeTransform {
    transform(projects: any, searchText: any, dummy: any): any {
        if (searchText == null) return projects;

        return projects.filter(function (project: any) {
            return (
                project.project.toLowerCase().indexOf(searchText.toLowerCase()) > -1
            );
        });
    }
}

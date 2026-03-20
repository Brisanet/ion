import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonInputComponent } from '../input/input.component';
import { IonUploadComponent } from './upload.component';

const createFile = (name = 'test.png', type = 'image/png'): File =>
  new File(['content'], name, { type });

describe('IonUploadComponent', () => {
  let component: IonUploadComponent;
  let fixture: ComponentFixture<IonUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('dropzone default state', () => {
    it('should render the upload icon', () => {
      const icon = fixture.nativeElement.querySelector('ion-icon[type="upload"]');
      expect(icon).toBeTruthy();
    });

    it('should render the click-to-add link text', () => {
      const link = fixture.nativeElement.querySelector('.upload-dropzone__link');
      expect(link.textContent.trim()).toBe('Clique para adicionar');
    });

    it('should not render acceptLabel when not provided', () => {
      const hint = fixture.nativeElement.querySelector('.upload-dropzone__hint');
      expect(hint).toBeNull();
    });

    it('should render acceptLabel when provided', () => {
      fixture.componentRef.setInput('acceptLabel', 'PNG, JPG até 5MB');
      fixture.detectChanges();
      const hint = fixture.nativeElement.querySelector('.upload-dropzone__hint');
      expect(hint.textContent.trim()).toBe('PNG, JPG até 5MB');
    });
  });

  describe('URL import section', () => {
    it('should hide URL import section by default', () => {
      const urlSection = fixture.nativeElement.querySelector('.upload-url');
      expect(urlSection).toBeNull();
    });

    it('should show URL import section when showUrlImport is true', () => {
      fixture.componentRef.setInput('showUrlImport', true);
      fixture.detectChanges();
      const urlSection = fixture.nativeElement.querySelector('.upload-url');
      expect(urlSection).toBeTruthy();
    });

    it('should reflect custom placeholder in the component input', () => {
      fixture.componentRef.setInput('urlPlaceholder', 'https://exemplo.com');
      fixture.detectChanges();
      expect(component.urlPlaceholder()).toBe('https://exemplo.com');
    });

    it('should emit urlImport with the URL value when onUrlImport is called', () => {
      const emitSpy = jest.spyOn(component.urlImport, 'emit');
      component.setUrlValue('https://example.com/image.png');
      component.onUrlImport();
      expect(emitSpy).toHaveBeenCalledWith('https://example.com/image.png');
    });

    it('should not emit urlImport when URL is empty', () => {
      const emitSpy = jest.spyOn(component.urlImport, 'emit');
      component.setUrlValue('');
      component.onUrlImport();
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should not emit urlImport when URL is only whitespace', () => {
      const emitSpy = jest.spyOn(component.urlImport, 'emit');
      component.setUrlValue('   ');
      component.onUrlImport();
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  describe('file selection via input', () => {
    it('should set selectedFile and emit fileChange when a file is selected', () => {
      const emitSpy = jest.spyOn(component.fileChange, 'emit');
      const file = createFile();

      const input = fixture.nativeElement.querySelector('input[type="file"]');
      Object.defineProperty(input, 'files', { value: [file], configurable: true });
      input.dispatchEvent(new Event('change'));

      expect(component.selectedFile()).toBe(file);
      expect(emitSpy).toHaveBeenCalledWith(file);
    });

    it('should not change selectedFile when no file is in the event', () => {
      const emitSpy = jest.spyOn(component.fileChange, 'emit');
      const input = fixture.nativeElement.querySelector('input[type="file"]');
      Object.defineProperty(input, 'files', { value: [], configurable: true });
      input.dispatchEvent(new Event('change'));

      expect(component.selectedFile()).toBeNull();
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should forward accept attribute to the hidden input', () => {
      fixture.componentRef.setInput('accept', 'image/*');
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('input[type="file"]');
      expect(input.getAttribute('accept')).toBe('image/*');
    });
  });

  describe('file display after selection', () => {
    beforeEach(() => {
      component.selectedFile.set(createFile('documento.pdf'));
      fixture.detectChanges();
    });

    it('should show file name', () => {
      const fileName = fixture.nativeElement.querySelector('.upload-dropzone__file-name');
      expect(fileName.textContent.trim()).toBe('documento.pdf');
    });

    it('should show doc icon when file is selected', () => {
      const icon = fixture.nativeElement.querySelector('ion-icon[type="doc"]');
      expect(icon).toBeTruthy();
    });

    it('should hide the default content when file is selected', () => {
      const content = fixture.nativeElement.querySelector('.upload-dropzone__content');
      expect(content).toBeNull();
    });

    it('should apply has-file CSS class to dropzone', () => {
      const dropzone = fixture.nativeElement.querySelector('.upload-dropzone');
      expect(dropzone.classList).toContain('upload-dropzone--has-file');
    });
  });

  describe('remove file', () => {
    it('should emit fileRemove when removeFile is called', () => {
      const emitSpy = jest.spyOn(component.fileRemove, 'emit');
      component.selectedFile.set(createFile());
      fixture.detectChanges();

      component.removeFile();

      expect(emitSpy).toHaveBeenCalled();
    });

    it('should clear selectedFile when removeFile is called', () => {
      component.selectedFile.set(createFile());
      fixture.detectChanges();

      component.removeFile();
      fixture.detectChanges();

      expect(component.selectedFile()).toBeNull();
    });

    it('should show default content again after file is removed', () => {
      component.selectedFile.set(createFile());
      fixture.detectChanges();
      component.removeFile();
      fixture.detectChanges();

      const content = fixture.nativeElement.querySelector('.upload-dropzone__content');
      expect(content).toBeTruthy();
    });

    it('should not open file dialog when clicking the remove button', () => {
      component.selectedFile.set(createFile());
      fixture.detectChanges();

      const clickSpy = jest.spyOn(component.fileInputRef.nativeElement, 'click');
      const removeButton = fixture.nativeElement.querySelector('ion-button[icontype="trash"]');
      removeButton.click();
      fixture.detectChanges();

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('drag and drop', () => {
    const makeDragEvent = (files: File[] = []): DragEvent => {
      const event = { preventDefault: jest.fn() } as unknown as DragEvent;
      Object.defineProperty(event, 'dataTransfer', {
        value: { files },
        configurable: true,
      });
      return event;
    };

    it('should set isDragging to true on dragover', () => {
      component.onDragOver(makeDragEvent());
      expect(component.isDragging()).toBe(true);
    });

    it('should apply dragging class to dropzone when isDragging is true', () => {
      component.isDragging.set(true);
      fixture.detectChanges();
      const dropzone = fixture.nativeElement.querySelector('.upload-dropzone');
      expect(dropzone.classList).toContain('upload-dropzone--dragging');
    });

    it('should set isDragging to false on dragleave', () => {
      component.isDragging.set(true);
      component.onDragLeave(makeDragEvent());
      expect(component.isDragging()).toBe(false);
    });

    it('should set selectedFile and emit fileChange on drop', () => {
      const emitSpy = jest.spyOn(component.fileChange, 'emit');
      const file = createFile('dropped.png');
      component.onDrop(makeDragEvent([file]));
      expect(component.selectedFile()).toBe(file);
      expect(emitSpy).toHaveBeenCalledWith(file);
    });

    it('should set isDragging to false after drop', () => {
      component.isDragging.set(true);
      component.onDrop(makeDragEvent([createFile()]));
      expect(component.isDragging()).toBe(false);
    });

    it('should not set isDragging when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      component.onDragOver(makeDragEvent());
      expect(component.isDragging()).toBe(false);
    });

    it('should not set file on drop when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const emitSpy = jest.spyOn(component.fileChange, 'emit');
      component.onDrop(makeDragEvent([createFile()]));
      expect(component.selectedFile()).toBeNull();
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
    });

    it('should apply disabled CSS class to dropzone', () => {
      const dropzone = fixture.nativeElement.querySelector('.upload-dropzone');
      expect(dropzone.classList).toContain('upload-dropzone--disabled');
    });

    it('should not open file dialog when disabled', () => {
      const clickSpy = jest.spyOn(component.fileInputRef.nativeElement, 'click');
      component.openFileDialog();
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('should disable the hidden file input', () => {
      const input = fixture.nativeElement.querySelector('input[type="file"]');
      expect(input.disabled).toBe(true);
    });
  });

  describe('openFileDialog', () => {
    it('should trigger click on file input when not disabled', () => {
      const clickSpy = jest.spyOn(component.fileInputRef.nativeElement, 'click');
      component.openFileDialog();
      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('setUrlValue', () => {
    it('should update urlValue signal', () => {
      component.setUrlValue('https://example.com');
      expect(component.urlValue()).toBe('https://example.com');
    });
  });

  describe('upload-url-input element', () => {
    const getUrlInputInstance = (f: ComponentFixture<IonUploadComponent>) =>
      f.debugElement
        .query(By.css('[data-testid="upload-url-input"]'))
        .componentInstance as IonInputComponent;

    beforeEach(() => {
      fixture.componentRef.setInput('showUrlImport', true);
      fixture.detectChanges();
    });

    it('should render the ion-input with data-testid="upload-url-input"', () => {
      const el = fixture.nativeElement.querySelector('[data-testid="upload-url-input"]');
      expect(el).toBeTruthy();
    });

    it('should forward urlPlaceholder to the ion-input placeholder', () => {
      fixture.componentRef.setInput('urlPlaceholder', 'https://my-image.com');
      fixture.detectChanges();
      expect(getUrlInputInstance(fixture).placeholder()).toBe('https://my-image.com');
    });

    it('should forward disabled to the ion-input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(getUrlInputInstance(fixture).disabled()).toBe(true);
    });

    it('should have inputButton set to true on the ion-input', () => {
      expect(getUrlInputInstance(fixture).inputButton()).toBe(true);
    });

    it('should configure the import button with label "Importar" and type "secondary"', () => {
      const config = getUrlInputInstance(fixture).inputButtonConfig();
      expect(config?.label).toBe('Importar');
      expect(config?.type).toBe('secondary');
    });

    it('should reflect urlValue on the ion-input value binding', () => {
      component.setUrlValue('https://bound.com');
      fixture.detectChanges();
      expect(getUrlInputInstance(fixture).value()).toBe('https://bound.com');
    });

    it('should update urlValue via setUrlValue when valueChange fires on the ion-input', () => {
      getUrlInputInstance(fixture).onChange('https://test.com/image.png');
      expect(component.urlValue()).toBe('https://test.com/image.png');
    });

    it('should emit urlImport when clickButton fires on the ion-input with a non-empty URL', () => {
      const emitSpy = jest.spyOn(component.urlImport, 'emit');
      const ionInput = getUrlInputInstance(fixture);
      ionInput.onChange('https://test.com/image.png');
      ionInput.handleClick();
      expect(emitSpy).toHaveBeenCalledWith('https://test.com/image.png');
    });

    it('should not emit urlImport when clickButton fires with an empty URL', () => {
      const emitSpy = jest.spyOn(component.urlImport, 'emit');
      getUrlInputInstance(fixture).handleClick();
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });
});

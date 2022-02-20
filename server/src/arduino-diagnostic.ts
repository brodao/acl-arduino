import { TextDocument } from "vscode-languageserver-textdocument";
import {
  CodeDescription,
  Diagnostic,
  DiagnosticSeverity,
  DiagnosticTag,
  DocumentSymbol,
} from "vscode-languageserver/node";

export namespace ArduinoDiagnostic {
  export enum Error {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    E001_INVALID_CLI_VERSION = "E001",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    E002_INVALID_BOARD = "E002",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    E003_INVALID_PLATFORM_VERSION = "E003",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    E004_INVALID_PORT = "E004",
  }

  export enum Information {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    I002_INVALID_BOARD_NAME_UPDATE = "I002",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    I003_INVALID_BOARD_NAME_INSERT = "I003",
  }

  //const NO_RANGE: Range = Range.create(0, 0, 0, 0);

  export function createDiagnostic(
    textDocument: TextDocument,
    documentSymbol: DocumentSymbol,
    code: Error | Information
  ): Diagnostic {
    return {
      severity: codeToSeverity(code),
      code: code,
      //source: textDocument.uri,
      range: documentSymbol.range,
      message: codeToMessage(code),
      codeDescription: codeToDescription(code),
      tags: codeToTags(code),
      //relatedInformation?: DiagnosticRelatedInformation[];
      data: {
        source: textDocument.uri,
        name: documentSymbol.name,
        value: documentSymbol.detail,
      },
    };
  }

  function codeToSeverity(
    code: Error | Information
  ): DiagnosticSeverity | undefined {
    switch (code.charAt(0)) {
      case "E":
        return DiagnosticSeverity.Error;

      case "W":
        return DiagnosticSeverity.Warning;

      case "I":
        return DiagnosticSeverity.Information;

      case "H":
        return DiagnosticSeverity.Hint;

      default:
        break;
    }

    return undefined;
  }

  function codeToMessage(code: Error | Information): string {
    switch (code) {
      case Error.E001_INVALID_CLI_VERSION:
        return "Invalid CLI version.";
      case Error.E002_INVALID_BOARD:
        return "Invalid board (FQBN).";
      case Error.E003_INVALID_PLATFORM_VERSION:
        return "Invalid platform version.";
      case Error.E004_INVALID_PORT:
        return "Port required.";
      //
      //
      case Information.I002_INVALID_BOARD_NAME_UPDATE:
        return "Board name is not equal FQBN name.";
      case Information.I003_INVALID_BOARD_NAME_INSERT:
        return "Board name is informed.";

      default:
        break;
    }

    return "Unknown error";
  }

  // @ts-ignore
  function codeToTags(code: Error | Information): DiagnosticTag[] | undefined {
    switch (code) {
      case Error.E001_INVALID_CLI_VERSION:
        return [DiagnosticTag.Deprecated];

      default:
        break;
    }

    return undefined;
  }

  function codeToDescription(
    code: ArduinoDiagnostic.Error | ArduinoDiagnostic.Information
  ): CodeDescription | undefined {
    switch (code) {
      case Error.E001_INVALID_CLI_VERSION:
        return { href: "http://teste" };

      default:
        break;
    }

    return undefined;
  }
}

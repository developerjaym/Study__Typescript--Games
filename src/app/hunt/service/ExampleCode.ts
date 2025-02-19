import {
  HuntEntity,
  HuntEntitySpecies,
  HuntEntityStatus,
} from "../component/model/HuntEvent.js";

// Basic position and size interface
export interface Vector2D {
  x: number;
  y: number;
}

// Base sprite interface
export interface SpriteAnimator {
  drawNext(entity: HuntEntity, ctx: CanvasRenderingContext2D, xFactor: number, yFactor: number): void;
}

// Abstract base class for animals
export abstract class AnimalSpriteAnimator implements SpriteAnimator {
  abstract drawNext(entity: HuntEntity, ctx: CanvasRenderingContext2D, xFactor: number, yFactor: number): void;
}

class LameSpriteAnimator extends AnimalSpriteAnimator {
  drawNext(entity: HuntEntity, context: CanvasRenderingContext2D, xFactor: number, yFactor: number): void {
    context.fillStyle =
      entity.status === HuntEntityStatus.ALIVE ? "green" : "red";
    context.strokeStyle = "black";
    context.lineWidth = 0;
    context.fillRect(entity.position.x * xFactor, entity.position.y * yFactor, entity.size.width *xFactor, entity.size.height *yFactor);
    context.font = `${entity.size.height * yFactor}px sans-serif`;
    context.fillText(entity.image, entity.position.x * xFactor, (entity.position.y + entity.size.height) * yFactor);
  }
}

// Goose implementation
export class GooseSpriteAnimator extends AnimalSpriteAnimator {
  drawNext(entity: HuntEntity, ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(entity.position.x, entity.position.y);

    // Draw body
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(0, 0, 20, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw neck - animate up/down motion
    const neckBob = Math.sin(((entity.pose % 3) * Math.PI) / 2) * 3;
    ctx.beginPath();
    ctx.moveTo(-5, -5);
    ctx.quadraticCurveTo(-15, -15 + neckBob, -20, -25 + neckBob);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.stroke();

    // Draw head
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(-22, -28 + neckBob, 8, 6, -0.5, 0, Math.PI * 2);
    ctx.fill();

    // Draw beak
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(-30, -30 + neckBob);
    ctx.lineTo(-35, -28 + neckBob);
    ctx.lineTo(-30, -26 + neckBob);
    ctx.fill();

    // Draw legs - animate walking motion
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 2;
    const legSwing = Math.sin(((entity.pose % 3) * Math.PI) / 2) * 10;

    // Back leg
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(5 - legSwing, 20);
    ctx.stroke();

    // Front leg
    ctx.beginPath();
    ctx.moveTo(-5, 10);
    ctx.lineTo(-10 + legSwing, 20);
    ctx.stroke();

    ctx.restore();
  }
}

// Duck implementation with different appearance and animation
export class DuckSpriteAnimator extends AnimalSpriteAnimator {
  drawNext(entity: HuntEntity, ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(entity.position.x, entity.position.y);

    // Draw body
    ctx.fillStyle = "#8B4513"; // brown color
    ctx.beginPath();
    ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw neck - less pronounced bob than goose
    const neckBob = Math.sin(((entity.pose % 3) * Math.PI) / 2) * 2;
    ctx.beginPath();
    ctx.moveTo(-3, -3);
    ctx.quadraticCurveTo(-8, -10 + neckBob, -12, -18 + neckBob);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#8B4513";
    ctx.stroke();

    // Draw head
    ctx.fillStyle = "#8B4513";
    ctx.beginPath();
    ctx.ellipse(-14, -20 + neckBob, 6, 5, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Draw beak
    ctx.fillStyle = "#FFB90F";
    ctx.beginPath();
    ctx.moveTo(-20, -21 + neckBob);
    ctx.lineTo(-23, -20 + neckBob);
    ctx.lineTo(-20, -19 + neckBob);
    ctx.fill();

    // Draw legs with walking animation
    ctx.strokeStyle = "#FFB90F";
    ctx.lineWidth = 2;
    const legSwing = Math.sin(((entity.pose % 3) * Math.PI) / 2) * 8;

    // Back leg
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.lineTo(3 - legSwing, 15);
    ctx.stroke();

    // Front leg
    ctx.beginPath();
    ctx.moveTo(-4, 8);
    ctx.lineTo(-7 + legSwing, 15);
    ctx.stroke();

    ctx.restore();
  }
}

export class HuntAnimationService {
  private map: Map<HuntEntitySpecies, AnimalSpriteAnimator>;
 private defaultAnimator: LameSpriteAnimator;

  constructor() {
    this.map = new Map<HuntEntitySpecies, AnimalSpriteAnimator>();
    this.map.set(HuntEntitySpecies.DUCK, new DuckSpriteAnimator());
    this.defaultAnimator = new LameSpriteAnimator();
  }

  animate(
    entities: HuntEntity[],
    canvas: HTMLCanvasElement,
    container: HTMLElement
  ) {
    const context = canvas.getContext("2d")!;

    for (const entity of entities) {
      const [xFactor, yFactor] = this.logicalCoordinateConverter(
        canvas,
        container
      );
      const animator = this.map.get(entity.name) || this.defaultAnimator;
      animator.drawNext(entity, context, xFactor, yFactor);
    }
  }

  logicalCoordinateConverter(
    canvas: HTMLCanvasElement,
    container: HTMLElement
  ): number[] {
    return [
      ((container.clientWidth / 600) * canvas.height) /
        canvas.clientHeight,
      ((container.clientHeight / 900) * canvas.height) /
        canvas.clientHeight,
    ];
  }
}
